# Week 2 – Backend Development

## Project Overview

This project demonstrates core backend web development concepts using the MERN stack (without a frontend). It covers:

- Node.js
- Express.js
- MongoDB
- Mongoose
- REST APIs
- JWT authentication
- bcrypt password hashing

## Assignments

### 1. To-Do List REST API
A complete REST API for managing a to-do list.

Endpoints:
- `POST /api/tasks` - Create a task
- `GET /api/tasks` - Get all tasks
- `GET /api/tasks/:id` - Get a specific task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task

### 2. User Authentication API
A complete authentication flow securely storing passwords.

Endpoints:
- `POST /api/auth/register` - Register a user (hashes password)
- `POST /api/auth/login` - Authenticate user & get JWT token

Features:
- Validates user input.
- Uses `bcryptjs` for secure password hashing.
- Uses JSON Web Tokens (JWT) for authentication.
- Includes `authMiddleware` for protecting routes.

### 3. Notes App Backend
A secure notes API where users can only perform operations on their own notes.

Endpoints:
- `POST /api/notes` - Create a note
- `GET /api/notes` - Get user's notes
- `GET /api/notes/:id` - Get user's specific note
- `PUT /api/notes/:id` - Update user's note
- `DELETE /api/notes/:id` - Delete user's note

Features:
- Protected routes using JWT.
- Authorization checks to ensure a user only accesses/modifies their own data.

## Technologies Used
- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token (JWT)
- bcryptjs
- dotenv
- cors

## Project Structure
```
week-2-backend/
│
├── config/
│   └── db.js
│
├── controllers/
│   ├── authController.js
│   ├── taskController.js
│   └── noteController.js
│
├── middleware/
│   ├── authMiddleware.js
│   └── errorMiddleware.js
│
├── models/
│   ├── User.js
│   ├── Task.js
│   └── Note.js
│
├── routes/
│   ├── authRoutes.js
│   ├── taskRoutes.js
│   └── noteRoutes.js
│
├── .env
├── .env.example
├── .gitignore
├── package.json
├── server.js
└── README.md
```

## Installation

Run:

```bash
npm install
```

## Environment Variables

Copy the `.env.example` file and rename it to `.env`:

```bash
cp .env.example .env
```

Set your configuration variables:
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d
```

## Start MongoDB

You need a running MongoDB database. You can:
- Run it locally on `mongodb://127.0.0.1:27017/week2_backend`
- Use a MongoDB Atlas cluster URI.

## Run the Server

Development:

```bash
npm run dev
```

Production:

```bash
npm start
```

## API Endpoints

| Method | Endpoint | Description | Auth Required |
| --- | --- | --- | --- |
| GET | `/` | API status | No |
| POST | `/api/auth/register` | Register new user | No |
| POST | `/api/auth/login` | Login user & get token | No |
| GET | `/api/tasks` | Get all tasks | No |
| POST | `/api/tasks` | Create a task | No |
| GET | `/api/tasks/:id` | Get task by ID | No |
| PUT | `/api/tasks/:id` | Update task by ID | No |
| DELETE | `/api/tasks/:id` | Delete task by ID | No |
| GET | `/api/notes` | Get logged-in user's notes | Yes |
| POST | `/api/notes` | Create a note | Yes |
| GET | `/api/notes/:id` | Get note by ID | Yes |
| PUT | `/api/notes/:id` | Update note by ID | Yes |
| DELETE | `/api/notes/:id` | Delete note by ID | Yes |

## Postman Testing

Follow these steps to manually test the API using Postman:

1. **Register**
   - **Method:** `POST`
   - **URL:** `http://localhost:5000/api/auth/register`
   - **Body (JSON):**
     ```json
     {
       "name": "Swarna",
       "email": "swarna@example.com",
       "password": "password123"
     }
     ```

2. **Login**
   - **Method:** `POST`
   - **URL:** `http://localhost:5000/api/auth/login`
   - **Body (JSON):**
     ```json
     {
       "email": "swarna@example.com",
       "password": "password123"
     }
     ```
   - **Action:** Copy the `token` from the response.

3. **Create task**
   - **Method:** `POST`
   - **URL:** `http://localhost:5000/api/tasks`
   - **Body (JSON):**
     ```json
     {
       "title": "Complete Week 2 assignment",
       "description": "Build Node.js REST API"
     }
     ```

4. **Get tasks**
   - **Method:** `GET`
   - **URL:** `http://localhost:5000/api/tasks`

5. **Update task**
   - **Method:** `PUT`
   - **URL:** `http://localhost:5000/api/tasks/:id` (Replace `:id` with actual Task ID)
   - **Body (JSON):**
     ```json
     {
       "completed": true
     }
     ```

6. **Delete task**
   - **Method:** `DELETE`
   - **URL:** `http://localhost:5000/api/tasks/:id`

7. **Create note (Protected)**
   - **Method:** `POST`
   - **URL:** `http://localhost:5000/api/notes`
   - **Headers:** Add `Authorization: Bearer <JWT_TOKEN>` (Replace `<JWT_TOKEN>` with copied token)
   - **Body (JSON):**
     ```json
     {
       "title": "My React Notes",
       "content": "React uses components, props and state."
     }
     ```

8. **Get notes (Protected)**
   - **Method:** `GET`
   - **URL:** `http://localhost:5000/api/notes`
   - **Headers:** Add `Authorization: Bearer <JWT_TOKEN>`

9. **Update note (Protected)**
   - **Method:** `PUT`
   - **URL:** `http://localhost:5000/api/notes/:id` (Replace `:id` with actual Note ID)
   - **Headers:** Add `Authorization: Bearer <JWT_TOKEN>`
   - **Body (JSON):**
     ```json
     {
       "title": "Updated React Notes"
     }
     ```

10. **Delete note (Protected)**
    - **Method:** `DELETE`
    - **URL:** `http://localhost:5000/api/notes/:id`
    - **Headers:** Add `Authorization: Bearer <JWT_TOKEN>`

## HTTP Status Codes

- **200 OK:** Successful request.
- **201 Created:** Resource created successfully.
- **400 Bad Request:** Invalid input or missing fields.
- **401 Unauthorized:** Missing or invalid JWT token.
- **404 Not Found:** The requested resource does not exist.
- **500 Internal Server Error:** Server-side error.
