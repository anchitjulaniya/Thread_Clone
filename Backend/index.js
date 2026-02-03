const express = require('express')
const mongoose = require('mongoose')
const connectDB = require('./Database/connectDB')
const dotenv = require('dotenv')
const userRoutes = require('./Routes/user')
const postRoutes = require('./Routes/post')
const messageRoutes = require('./Routes/message')
const cors = require('cors')
const http = require('http');
const { Server } = require('socket.io');
const {app,io, server} = require('./socket/socket')
const authMiddleware = require('./Middleware/authMiddleware')
const cookieParser = require('cookie-parser')
const migration = require('./migrateUserPost')

const allowedOrigins = [
    'http://localhost:5173', //frontend ka dalna hai
//   process.env.CORS_ORIGIN
];

// CORS options
const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
        callback(new Error('Not allowed by CORS'));
    }
},
credentials: true
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

dotenv.config();

connectDB();

// Middleware
app.use(express.json()); // to parse JSON data in the req.body
app.use(express.urlencoded({ extended : true}) ); // to parse the form data in the req.body
app.use(cookieParser());

// Routes

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/posts', postRoutes);
app.use('/api/v1/message', messageRoutes)
app.use('/migrate', migration);

const PORT =  5000;
// app.use(express.static('/public'));
server.listen(PORT, ()=>{console.log(`Server is running on ${PORT} port`)}); 