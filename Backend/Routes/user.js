const express = require('express')
const authMiddleware = require('../Middleware/authMiddleware')
const routes = express.Router()
const userController = require('../Controller/user')

routes.post('/signup', userController.signup)

routes.post('/signin', userController.signin)

routes.post('/logout', authMiddleware,  userController.logout)

routes.post('/follow/:id', authMiddleware,  userController.follow_unfollow)

routes.post('/update/:id', authMiddleware,  userController.updateUser)

// routes.get('/:profileId', userController.)

module.exports = routes