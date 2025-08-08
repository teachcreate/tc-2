# Google Classroom API Setup Guide

## Step 1: Create a Google Cloud Project

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Click "Select a project" → "New Project"
3. Enter project name: "TeachCreate-LMS-Integration"
4. Click "Create"

## Step 2: Enable Google Classroom API

1. In the Google Cloud Console, go to "APIs & Services" → "Library"
2. Search for "Google Classroom API"
3. Click on it and press "Enable"

## Step 3: Create Credentials

1. Go to "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "OAuth 2.0 Client IDs"
3. If prompted, configure the OAuth consent screen:
   - User Type: External
   - App name: TeachCreate.io
   - User support email: your email
   - Developer contact: your email
4. For Application type, select "Web application"
5. Add authorized redirect URIs:
   - `http://localhost:3000/auth/google/callback` (for development)
   - `https://your-domain.com/auth/google/callback` (for production)
6. Click "Create"

## Step 4: Get Your Credentials

After creating the OAuth client, you'll get:
- **Client ID**: Something like `123456789-abcdef.apps.googleusercontent.com`
- **Client Secret**: Something like `GOCSPX-abcdef123456`

## Step 5: Add to Environment Variables

Add these to your `.env` files:

### Server (.env)
```
GOOGLE_CLIENT_ID=your_client_id_here
GOOGLE_CLIENT_SECRET=your_client_secret_here
```

### Client (.env)
```
REACT_APP_GOOGLE_CLIENT_ID=your_client_id_here
```

## Step 6: Required Scopes

The following OAuth scopes are needed:
- `https://www.googleapis.com/auth/classroom.courses.readonly`
- `https://www.googleapis.com/auth/classroom.coursework`
- `https://www.googleapis.com/auth/classroom.rosters.readonly`

## Step 7: Test the Integration

Once credentials are set up, you can test the integration using the LMS Integration UI component.