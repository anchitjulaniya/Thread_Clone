const express = require('express')
const routes = express.Router()
const commentController = require('../Controller/comment')

routes.post('/comment', commentController.postComment)

routes.get('/comment', commentController.getComment)

module.exports = routes