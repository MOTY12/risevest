 import { Router } from 'express';
import { PostController } from '@controllers/posts.controller';
import { CreatePostDto } from '@dtos/posts.dto';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { AuthMiddleware } from '@/middlewares/auth.middleware';

export class PostRoute implements Routes {
    public path = '/posts';
    public router = Router();
    public post = new PostController();
    
    constructor() {
        this.initializeRoutes();
    }
    
    private initializeRoutes() {
        this.router.get(`${this.path}`, AuthMiddleware, this.post.getPosts);
        this.router.get(`${this.path}/:id(\\d+)`, AuthMiddleware,this.post.getPostById);
        this.router.post(`${this.path}`, AuthMiddleware, this.post.createPost);
        this.router.get(`/users/:id(\\d+)${this.path}`, AuthMiddleware, this.post.getPostByUserId);
        this.router.post(`${this.path}/:id(\\d+)/comments`, AuthMiddleware, this.post.commentOnPost);
        this.router.get(`${this.path}/topusers`, AuthMiddleware, this.post.topUsersWithMostPosts);
    }
}