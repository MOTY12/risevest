import request from 'supertest'
import { App } from '@/app';
import { CreatePostDto } from '@/dtos/posts.dto';
import { Post } from '@/interfaces/posts.interface';    
import { PostRoute } from '@/routes/posts.route';
import client from '@/database';

describe('Testing Posts', () => {
  let app: App; // Declare app outside the test blocks

  beforeAll(() => {
    // Initialize the app once before any tests
    const postsRoute = new PostRoute();
    app = new App([postsRoute]);
  });

  afterAll(async (app: any) => {
    if (app) {
      await app.close(); // Close the app instance and associated resources
    }
  });

  describe('[POST]/posts', () => {
    it('response statusCode 201 / created', async () => {
      const postData: CreatePostDto = {
        title: 'test title',
        content: 'test content',
        user_id: 1,
      };

      const authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImlhdCI6MTY5MzE2NzgxMSwiZXhwIjoxNjkzMTcxNDExfQ.tFaqsSymCagDzlBirM4lfTK1MPJKnpQB35wC0TZK6cg';

      const response = await request(app.getServer())
        .post('/posts')
        .set('Authorization', `Bearer ${authToken}`)
        .send(postData)
        .expect(201);

      // Add your assertions based on the response if needed
      expect(response.body).toBeDefined();
    });
  });
});


