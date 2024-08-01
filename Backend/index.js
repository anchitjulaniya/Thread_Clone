const express = require('express')
const mongoose = require('mongoose')
const app = express()
const connectDB = require('./Database/connectDB')
const dotenv = require('dotenv')
const userRoutes = require('./Routes/user')
const postRoutes = require('./Routes/post')
const cors = require('cors')

app.use(cors())

// const threadRoutes = require('./Routes/thread')
const authMiddleware = require('./Middleware/authMiddleware')
const cookieParser = require('cookie-parser')



dotenv.config();

// Database connection
// mongoose.connect(process.env.BASE_URL)
// .then(()=>{console.log("MongoDB Connected Successfully")})
// .catch((error)=>{console.log("MongoDB Error!",error)})
// or 
connectDB()

// Middleware
app.use(express.json()) // to parse JSON data in the req.body
app.use(express.urlencoded({ extended : true}) ) // to parse the form data in the req.body
app.use(cookieParser())

// Routes

app.use('/api/users', userRoutes)
app.use('/api/posts', authMiddleware, postRoutes)

const PORT =  1000

app.listen(PORT, ()=>{console.log(`Server is running on ${PORT} port`)})    