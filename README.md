# ABC Inc Blog App

Welcome to the ABC Inc Blog App! This application provides a platform for users to create, manage, and read blog posts. Users can sign up, log in, and interact with the blog posts.

### Table of Contents

* Features
* Installation
* Usage
* API Endpoints
* Authentication
* Error Handling
* Contributing
* License

### Features
1. User authentication and authorization
2. Create, update, and delete blog posts
3. View a list of all blog posts
4. Rate limiting and protection against XSS attacks and MongoDB injection

### Installation
1. Clone this repository
```
git clone https://github.com/your-username/abc-inc-blog-app.git
```
2. Navigate to the project directory
  ```
cd abc-inc-blog-app
```
3. Install the required npm packages
  ```
npm install
```
4. Create a .env file in the project root and configure your environment variables:
  ```
MONGODB_URI= your-mongodb-connection-uri
JWT_SECRET= your-jwt-secret-key
PORT= your desired port number
```
5. Start the Server
  ```
npm run dev
```
### Usage
The API is now running and can be accessed using tools like Postman or from your frontend application.
# API Endpoints

 ### User Routes
* `POST /api/v1/user/signup:` Create a new user account.
* `POST /api/v1/user/login:` Log in and receive an authentication token.

### Blog Routes
* `GET /api/v1/blog/allblog:` Get a list of all blog posts.
* `POST /api/v1/blog/create:` Create a new blog post.
* `PUT /api/v1/blog/update/:blogId:` Update a blog post by ID.
* `DELETE /api/v1/blog/delete/:blogId:` Delete a blog post by ID.

### Authentication
Protected routes require authentication using a JWT token. Include the token in the `Authorization` header of your requests:
 ```
Authorization: Bearer <your-token>
```
### Error Handling
The API provides meaningful error responses for various scenarios. Make sure to check the response status and the included error message.
