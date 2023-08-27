// import request from 'supertest';
// import { App } from '@/app';
// import { CreatePostDto } from '@dtos/posts.dto';
// import { Post } from '@interfaces/posts.interface';
// import client from '@/database';
// import { PostRoute } from '@/routes/posts.route';

// afterAll(async () => {
//     await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
//     });

// describe('Testing Posts', () => {
//     describe('[POST]/posts', () => {
//         it('response statusCode 201 / created', async () => {
//             const postData: CreatePostDto = {
//                 title: 'test title',
//                 content: 'test content',
//                 user_id: 1,
//             };
//             const postsRoute = new PostRoute();
//             const app = new App([postsRoute]);

//             return request(app.getServer()).post(`${postsRoute.path}`).send(postData).expect(201);
//         });
//     })
// })

