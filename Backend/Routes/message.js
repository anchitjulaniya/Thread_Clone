const express = require('express');
const routes = express.Router();
const authMiddleware = require('../Middleware/authMiddleware');
const upload = require('../Middleware/upload');
const cloudinary = require('../config/cloudinary');
const {sendMessage, createConversation} = require('../Controller/message')


routes.post('/send',authMiddleware, upload.single('file'), sendMessage );
routes.post('/conversation', authMiddleware, createConversation);

module.exports = routes;