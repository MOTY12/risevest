import { Service } from 'typedi';
import { HttpException } from '@exceptions/httpException';
import { Post } from '@interfaces/posts.interface';
import cilent from '@/database';

@Service()
export class PostService {
    public async findAllPost(): Promise<Post[]> {
    
        const sql = 'SELECT * FROM posts';
        const posts = await cilent.query(sql);
        
        return posts.rows;
    }
    
    public async findPostById(postId: number): Promise<Post> {
        const sql = 'SELECT * FROM posts WHERE id = $1';
        const findPost = await cilent.query(sql, [postId]);
        if (!findPost.rows[0]) throw new HttpException(409, "Post doesn't exist");
    
        return findPost.rows[0];
    }
    
    public async createPost(postData: Post): Promise<Post> {
        const sql = 'INSERT INTO posts (title, content, user_id) VALUES ($1, $2, $3) RETURNING *';
    
        const createPostData = await cilent.query(sql, [postData.title, postData.content, postData.user_id]);
        return createPostData.rows[0];
    }
    
    public async updatePost(postId: number, postData: Post): Promise<Post> {
        const sql = 'UPDATE posts SET title = $1, content = $2 WHERE id = $3 RETURNING *';
        const updatePostData = await cilent.query(sql, [postData.title, postData.content, postId]);
        if (!updatePostData.rows[0]) throw new HttpException(409, "Post doesn't exist");
    
        return updatePostData.rows[0];
    }
    
    //get post by user id
    public async findPostByUserId(userId: number): Promise<Post[]> {
        const sql = 'SELECT * FROM posts WHERE user_id = $1';
        const findPost = await cilent.query(sql, [userId]);
        if (!findPost.rows[0]) throw new HttpException(409, "Post doesn't exist");
    
        return findPost.rows;
    }

   //comment on a post by post id and user id, comment and store in comments table
    public async commentOnPost(postId: number, userId: number, comment: string): Promise<Post[]> {
        const sql = 'INSERT INTO comments (post_id, user_id, comment) VALUES ($1, $2, $3) RETURNING *';
        const commentOnPost = await cilent.query(sql, [postId, userId, comment]);
        if (!commentOnPost.rows[0]) throw new HttpException(409, "Post doesn't exist");
    
        return commentOnPost.rows;
    }

    //Fetch the top users with the most posts and for each users fetch their lastest comment they made on any post
    public async topUsersWithMostPosts(): Promise<Post[]> {
        const sql =   'SELECT users.id, users.username, posts.title, comments.comment FROM users LEFT JOIN posts ON users.id = posts.user_id LEFT JOIN comments ON posts.id = comments.post_id WHERE comments.createdAt = ( SELECT MAX(createdAt) FROM comments WHERE post_Id = posts.id ) ORDER BY (SELECT COUNT(posts.id) FROM posts WHERE posts.user_id = users.id ) DESC LIMIT 3;';
        const topUsers = await cilent.query(sql);
        if (!topUsers.rows[0]) throw new HttpException(409, "Post doesn't exist");

        return topUsers.rows;
    }


   

}