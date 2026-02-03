const express = require("express");
const http = require("http");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const connectDB = require("./Database/connectDB");
const initSocket = require("./socket/socket");

// Routes
const userRoutes = require("./Routes/user");
const postRoutes = require("./Routes/post");
const messageRoutes = require("./Routes/message");
const migration = require("./migrateUserPost");

dotenv.config();

// App & Server
const app = express();
const server = http.createServer(app);

// DB
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/posts", postRoutes);
app.use("/api/v1/message", messageRoutes);
app.use("/migrate", migration);

// Socket init
initSocket(server);

// Start server
// const PORT = Number(process.env.PORT) ;
const PORT = Number(process.env.PORT) || 5000;

server.listen(PORT,'0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
