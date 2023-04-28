# Social Media API

This is a RESTful API for a social media application. The API is built using Node.js, Express, and MongoDB.

The API provides endpoints for user authentication, user profile management, and post creation, management, and interaction.

## Installation

To install and run the API, follow these steps:

+ Clone the repository

+ Install dependencies: npm install.

+ Set up environment variables
   + Create a .env file at the root of the project.
   + Add the following variables and their values to the file:
      + MONGO_URI=<your-mongodb-uri>
      + JWT_SECRET=<your-jwt-secret>
      + Replace <your-mongodb-uri> with the URI for your MongoDB instance.
      + Replace <your-jwt-secret> with a secret string of your choice.

+ Start the API: npm start      


## Endpoints

The following endpoints are available:

### User Authentication
+ POST /authenticate: Authenticate a user with email and password.

### User Profile Management
+ POST /users: Sign up a new user.
+ POST /follow/:id: Follow a user by their ID.
+ POST /unfollow/:id: Unfollow a user by their ID.
+ GET /user: Get the profile of the currently authenticated user.

### Post Management and Interaction
+ POST /posts: Create a new post.
+ DELETE /posts/:id: Delete a post by its ID.
+ POST /like/:id: Like a post by its ID.
+ POST /unlike/:id: Unlike a post by its ID.
+ POST /comment/:id: Comment on a post by its ID.
+ GET /posts/:id: Get a single post by its ID.
+ GET /all_posts: Get all posts of the currently authenticated user.

## Validation
The API uses the express-validator library to validate input data. The validation rules are defined in the validator.js file in the middleware folder.

## Authorization
The API uses JSON Web Tokens (JWT) for authentication and authorization. The JWT secret is stored in the .env file.

To access protected endpoints, clients must include a valid JWT in the Authorization header of the request, in the format Bearer <token>.