import { google } from 'googleapis';
import { supabase } from '../supabaseClient.js';

class GoogleClassroomService {
  static async getAuthUrl(userId) {
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      `${process.env.BASE_URL}/auth/google/callback`
    );

    const scopes = [
      'https://www.googleapis.com/auth/classroom.courses.readonly',
      'https://www.googleapis.com/auth/classroom.coursework',
      'https://www.googleapis.com/auth/classroom.rosters.readonly'
    ];

    const url = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: scopes,
      state: userId // Pass user ID to identify user after callback
    });

    return url;
  }

  static async handleCallback(code, userId) {
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      `${process.env.BASE_URL}/auth/google/callback`
    );

    try {
      const { tokens } = await oauth2Client.getToken(code);
      oauth2Client.setCredentials(tokens);

      // Get user info to store external_id
      const oauth2 = google.oauth2({ version: 'v2', auth: oauth2Client });
      const userInfo = await oauth2.userinfo.get();

      // Store integration in database
      const { data, error } = await supabase
        .from('lms_integrations')
        .upsert({
          user_id: userId,
          provider: 'google_classroom',
          external_id: userInfo.data.email,
          access_token: tokens.access_token,
          refresh_token: tokens.refresh_token,
          expires_at: new Date(tokens.expiry_date).toISOString()
        })
        .select();

      if (error) throw error;
      return data[0];
    } catch (error) {
      console.error('Error handling Google OAuth callback:', error);
      throw error;
    }
  }

  static async refreshToken(integrationId) {
    const { data: integration, error } = await supabase
      .from('lms_integrations')
      .select('*')
      .eq('id', integrationId)
      .single();

    if (error) throw error;

    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET
    );

    oauth2Client.setCredentials({
      refresh_token: integration.refresh_token
    });

    try {
      const { credentials } = await oauth2Client.refreshAccessToken();
      
      // Update tokens in database
      const { error: updateError } = await supabase
        .from('lms_integrations')
        .update({
          access_token: credentials.access_token,
          expires_at: new Date(credentials.expiry_date).toISOString()
        })
        .eq('id', integrationId);

      if (updateError) throw updateError;
      return credentials.access_token;
    } catch (error) {
      console.error('Error refreshing token:', error);
      throw error;
    }
  }

  static async getAuthenticatedClient(integrationId) {
    const { data: integration, error } = await supabase
      .from('lms_integrations')
      .select('*')
      .eq('id', integrationId)
      .single();

    if (error) throw error;

    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET
    );

    // Check if token is expired
    const now = new Date();
    const expiresAt = new Date(integration.expires_at);
    
    if (now >= expiresAt) {
      // Refresh token
      const newAccessToken = await this.refreshToken(integrationId);
      oauth2Client.setCredentials({
        access_token: newAccessToken,
        refresh_token: integration.refresh_token
      });
    } else {
      oauth2Client.setCredentials({
        access_token: integration.access_token,
        refresh_token: integration.refresh_token
      });
    }

    return oauth2Client;
  }

  static async getCourses(integrationId) {
    try {
      const auth = await this.getAuthenticatedClient(integrationId);
      const classroom = google.classroom({ version: 'v1', auth });

      const response = await classroom.courses.list({
        teacherId: 'me',
        courseStates: ['ACTIVE']
      });

      return response.data.courses || [];
    } catch (error) {
      console.error('Error fetching courses:', error);
      throw error;
    }
  }

  static async createAssignment(integrationId, assignmentData) {
    try {
      const auth = await this.getAuthenticatedClient(integrationId);
      const classroom = google.classroom({ version: 'v1', auth });

      const courseWork = {
        title: assignmentData.title,
        description: assignmentData.description || 'Assignment created via TeachCreate.io',
        materials: [{
          link: {
            url: assignmentData.url,
            title: assignmentData.title
          }
        }],
        workType: 'ASSIGNMENT',
        state: 'PUBLISHED'
      };

      const response = await classroom.courses.courseWork.create({
        courseId: assignmentData.courseId,
        requestBody: courseWork
      });

      return {
        success: true,
        assignmentId: response.data.id,
        url: response.data.alternateLink
      };
    } catch (error) {
      console.error('Error creating assignment:', error);
      throw error;
    }
  }
}

export default GoogleClassroomService;