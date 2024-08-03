<!-- ## User
1. signup - post
2. signin - post
3. follow - put
4. update/change Password - put
5. logout - post
6. get Profile - get

## Post
1. create Post - post
2. like a post - post
3. reply - post
4. delete a post - delete
5. get a post - get
6. timeline - get -->

# 🌟 MERN Stack Project 🌟

## 📖 Overview

This project is a MERN stack application consisting of a backend built with Express.js and MongoDB, and a frontend built with React.js. The application includes user authentication and post creation features.

## 💻 Technologies Used

- **🍃 MongoDB**: NoSQL database
- **🚀 Express.js**: Backend framework
- **⚛️ React.js**: Frontend library
- **🔋 Node.js**: JavaScript runtime

## 🚀 Getting Started

### 📋 Prerequisites

- 🖥️ Node.js and npm installed
- 🗃️ MongoDB instance running locally or remotely

### 📦 Installation

1. 🌀 Clone the repository:
   ```bash
   git clone https://github.com/yourusername/mern-project.git

2. 📂 Navigate to the project directory:
    ```cd mern-project

3. 📥 Install the dependencies:
    ```npm install

4. 🛠️ Create a .env file in the root directory and add the following environment variables:
    ```MONGODB_URI=mongodb://localhost:27017/yourdbname
        JWT_SECRET=your_jwt_secret

5. ▶️ Start the development server:
    ```npm run dev

## 🌐 API Routes

### 👤 User Routes

#### ➕ POST /api/users/signup
- **📝 Description**: Register a new user
- **📦 Body Parameters**:
  - `userName`: String
  - `mobile`: String
  - `email`: String
  - `password`: String
- **📤 Response**:
  - ✅ 201 Created on success
  - ❌ 500 Internal Server Error on failure

#### 🔑 POST /api/users/signin
- **📝 Description**: Authenticate an existing user
- **📦 Body Parameters**:
  - `email`: String
  - `password`: String
- **📤 Response**:
  - ✅ 200 OK on success
  - ❌ 401 Unauthorized on failure

#### 🚪 POST /api/users/logout
- **📝 Description**: Log out the current user
- **📤 Response**:
  - ✅ 200 OK on success

#### 👥➕ POST /api/users/follow/:id
- **📝 Description**: Follow or unfollow a user
- **🔗 URL Parameters**:
  - `id`: User ID to follow/unfollow
- **📤 Response**:
  - ✅ 200 OK on success
  - ❌ 401 Unauthorized if not logged in

#### 🛠️ POST /api/users/update/:id
- **📝 Description**: Update user information
- **🔗 URL Parameters**:
  - `id`: User ID to update
- **📦 Body Parameters**:
  - `userName`: String (optional)
  - `mobile`: String (optional)
  - `email`: String (optional)
  - `password`: String (optional)
- **📤 Response**:
  - ✅ 200 OK on success
  - ❌ 401 Unauthorized if not logged in

### 📝 Post Routes

#### https://thread-clone-eiee.onrender.com

#### 📜 GET /api/posts/feed
- **📝 Description**: Get all feed posts
- **📤 Response**:
  - ✅ 200 OK on success
  - ❌ 500 Internal Server Error on failure

#### ➕ POST /api/posts/create
- **📝 Description**: Create a new post
- **📦 Body Parameters**:
  - `postedBy`: User ID
  - `text`: String
  - `image`: String (optional)
- **📤 Response**:
  - ✅ 201 Created on success
  - ❌ 500 Internal Server Error on failure

#### 🔍 GET /api/posts/:postId
- **📝 Description**: Get a single post by ID
- **🔗 URL Parameters**:
  - `postId`: Post ID
- **📤 Response**:
  - ✅ 200 OK on success
  - ❌ 404 Not Found if the post doesn't exist

#### 🗑️ DELETE /api/posts/:postId
- **📝 Description**: Delete a post by ID
- **🔗 URL Parameters**:
  - `postId`: Post ID
- **📤 Response**:
  - ✅ 200 OK on success
  - ❌ 404 Not Found if the post doesn't exist

#### 👍 POST /api/posts/like/:postId
- **📝 Description**: Like a post
- **🔗 URL Parameters**:
  - `postId`: Post ID
- **📤 Response**:
  - ✅ 200 OK on success
  - ❌ 404 Not Found if the post doesn't exist

#### 💬 POST /api/posts/reply/:postId
- **📝 Description**: Reply to a post
- **🔗 URL Parameters**:
  - `postId`: Post ID
- **📦 Body Parameters**:
  - `text`: String
- **📤 Response**:
  - ✅ 201 Created on success
  - ❌ 500 Internal Server Error on failure


  #### Frontend Link - [https://thread-clone-mauve.vercel.app/](https://thread-clone-mauve.vercel.app/) (InProgress)
