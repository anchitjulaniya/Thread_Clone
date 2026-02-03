const express = require('express');
const authMiddleware = require('../Middleware/authMiddleware');
const postController = require('../Controller/post');
const upload = require('../Middleware/upload');

const routes = express.Router();

routes.get('/feed', authMiddleware, postController.getFeedPosts);
routes.post('/create', authMiddleware, upload.single("image"), postController.createPost); 
routes.get('/', postController.feedPosts);

// authMiddleware
routes.get('/:postId', postController.getPost); // get single post by id
routes.delete('/:postId', authMiddleware,  postController.deletePost); // delete post
routes.put('/like/:postId', authMiddleware, postController.likePost); // like post
// routes.post('/reply/:postId',  postController.replyToPost) // reply

module.exports = routes;