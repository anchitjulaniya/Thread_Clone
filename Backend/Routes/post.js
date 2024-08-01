const express = require('express')
const authMiddleware = require('../Middleware/authMiddleware')
const postController = require('../Controller/post')

const routes = express.Router()

routes.get('feed',   postController.getFeedPosts)
routes.post('/create',   postController.createPost ) 
routes.get('/:postId',   postController.updatePost) // get single post by id
routes.delete('/:postId',   postController.deletePost) // delete post
routes.post('/like/:postId',   postController.likePost) // like post
routes.post('/reply/:postId',   postController.replyToPost) // reply

module.exports = routes