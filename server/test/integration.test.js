import request from 'supertest';
import { supabase } from '../supabaseClient.js';
import app from '../index.js'; // Assuming your Express app is exported from index.js

describe('Integration Tests', () => {
  let testProductId;
  let testUserId;

  beforeAll(async () => {
    // Create a test product and user
    const { data: product, error: productError } = await supabase
      .from('products')
      .insert({
        creator_id: '00000000-0000-0000-0000-000000000000', // Replace with a valid user ID
        title: 'Test Product',
        description: 'Test Description',
        price: 9.99,
        type: 'tool',
        thumbnail_url: 'http://example.com/thumbnail.jpg',
      })
      .select()
      .single();

    if (productError) throw productError;
    testProductId = product.id;

    const { data: user, error: userError } = await supabase
      .from('users')
      .insert({
        email: 'test@example.com',
        password_hash: 'password',
        role: 'teacher',
      })
      .select()
      .single();

    if (userError) throw userError;
    testUserId = user.id;
  });

  afterAll(async () => {
    // Clean up test data
    await supabase.from('products').delete().eq('id', testProductId);
    await supabase.from('users').delete().eq('id', testUserId);
  });

  describe('Product API', () => {
    it('should add a question to a product', async () => {
      const questionData = {
        type_id: 'some-question-type-id',
        data: { questionText: 'Test question?', answer: 'Test answer' },
      };

      const response = await request(app)
        .post(`/products/${testProductId}/questions`)
        .send(questionData)
        .expect(200);

      expect(response.body).toBeDefined();
      expect(response.body.success).toBe(true);
    });

    it('should start a game session for a product', async () => {
      const response = await request(app)
        .post(`/products/${testProductId}/start-game`)
        .send({ settings: { /* Game settings */ } })
        .expect(200);

      expect(response.body).toBeDefined();
      expect(response.body.join_code).toBeDefined();
    });

    it('should assign a product to an LMS', async () => {
      // First, create an LMS integration
      const { data: integration, error: integrationError } = await supabase
        .from('lms_integrations')
        .insert({
          user_id: testUserId,
          provider: 'test_lms',
          external_id: 'test_course',
          access_token: 'test_token',
        })
        .select()
        .single();

      if (integrationError) throw integrationError;

      const assignmentData = {
        integrationId: integration.id,
        courseId: 'test_course',
        title: 'Test Assignment',
      };

      const response = await request(app)
        .post(`/products/${testProductId}/assign-lms`)
        .send(assignmentData)
        .expect(200);

      expect(response.body).toBeDefined();
      expect(response.body.success).toBe(true);

      // Clean up the integration
      await supabase.from('lms_integrations').delete().eq('id', integration.id);
    });
  });
});