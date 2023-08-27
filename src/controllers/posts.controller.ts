import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { PostService } from '@/services/posts.service';
import { Post } from '@/interfaces/posts.interface';
import { CreatePostDto } from '@/dtos/posts.dto';
import { RequestWithUser } from '@/interfaces/auth.interface';
import { User } from '@/interfaces/users.interface';

export class PostController {
    public post = Container.get(PostService);
    
    public getPosts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
        const findAllPostsData: Post[] = await this.post.findAllPost();
    
        res.status(200).json({ data: findAllPostsData, message: 'findAll' });
        } catch (error) {
        next(error);
        }
    };
    
    public getPostById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
        const postId = Number(req.params.id);
        const findOnePostData: Post = await this.post.findPostById(postId);
    
        res.status(200).json({ data: findOnePostData, message: 'findOne' });
        } catch (error) {
        next(error);
        }
    };
    
    public createPost = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
        try {
        const postData: CreatePostDto = req.body;
        const userData: User = req.user;

        postData.user_id = userData.id;

        const createPostData: Post = await this.post.createPost(postData,);

        res.status(201).json({ data: createPostData, message: 'created' });
        } catch (error) {
        next(error);
        }
    };
    
   //get post by user id
    public getPostByUserId = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
        const userId = Number(req.params.id);
        const findOnePostData: Post[] = await this.post.findPostByUserId(userId);
    
        res.status(200).json({ data: findOnePostData, message: 'findOne' });
        } catch (error) {
        next(error);
        }
    }

    //comment on a post by post id and user id, comment and store in comments table 
    public commentOnPost = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
        try {
        const postId = Number(req.params.id);
        const userId = req.user.id;
        const comment = req.body.comment;
        const commentOnPostData: Post[] = await this.post.commentOnPost(postId, userId, comment);
    
        res.status(200).json({ data: commentOnPostData, message: 'commented' });
        } catch (error) {
        next(error);
        }
    }

    public topUsersWithMostPosts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
        const topUsersData: Post[] = await this.post.topUsersWithMostPosts();
    
        res.status(200).json({ data: topUsersData, message: 'top users' });
        } catch (error) {
        next(error);
        }
    }

}

