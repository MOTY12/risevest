import request from 'supertest';
import { App } from '@/app';
import { CreateUserDto } from '@dtos/users.dto';
import { AuthRoute } from '@routes/auth.route';

afterAll(async () => {
    await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
    
    }
);

//test for login
describe('Testing Auth', () => {
    describe('[POST] /login', () => {
        it('response should have the Set-Cookie header with the Authorization token', async () => {
            const userData: CreateUserDto = {
                "email": "mohuishg@gmail.com",
                "password": "mukhtar2944"
            };
            const authRoute = new AuthRoute();
            const app = new App([authRoute]);

            return request(app.getServer()).post('/login').send(userData).expect('Set-Cookie', /^Authorization=.+/);

        });
    });
});


// describe('Testing Posts', () => {
//   let app: App;

//   beforeAll(() => {
//     const postsRoute = new PostRoute();
//     app = new App([postsRoute]);
//   });

//   afterAll(async () => {
//     if (app) {
//       await app.close();
//     }
//   });

//   describe('[POST]/posts', () => {
//     it('response statusCode 201 / created', async () => {
//       const postData: CreatePostDto = {
//         title: 'test title',
//         content: 'test content',
//         user_id: 1,
//       };

//       // Simulate authentication by setting an authorization token
//       const authToken = 'your-mock-auth-token';
      
//       const response = await request(app.getServer())
//         .post('/posts')
//         .set('Authorization', `Bearer ${authToken}`)
//         .send(postData)
//         .expect(201);

//       // Add your assertions based on the response if needed
//       expect(response.body).toBeDefined();
//     });
//   });
// });
