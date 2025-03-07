import express from 'express';
import upload from '../middlewares/uploadMiddleware.js';
import authenticateToken from '../middlewares/authenticateToken.js';
import { createPost, deletePost, deletePosts, editPost, fetchPosts } from '../controllers/postControllers.js';

const postRouter = express.Router();

postRouter.post('/create-post', authenticateToken, upload.single('thumbnail'), createPost);
postRouter.get('/posts', fetchPosts);
postRouter.patch('/edit-post/:id', authenticateToken, upload.single('thumbnail'), editPost);
postRouter.delete('/delete-post/:id', authenticateToken, deletePost);
postRouter.delete('/delete-posts', authenticateToken, deletePosts);

export default postRouter;