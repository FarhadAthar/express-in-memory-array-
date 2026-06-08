# Express MVC Users REST API

A beginner-friendly REST API project using Node.js, Express.js, MongoDB Community Server, Mongoose, and MVC architecture.

## Features

- Express.js server
- MVC folder structure
- CRUD APIs for users
- MongoDB database with Mongoose
- Local MongoDB connection using `MONGO_URI`
- Centralized error handling
- Clean JSON responses with `success`, `message`, and `data`
- Proper HTTP status codes
- Request logging middleware
- 404 route handler
- Environment variables with `dotenv`
- Nodemon for development

## Folder Structure

```text
src/
  config/
    db.js
  controllers/
    userController.js
  routes/
    userRoutes.js
  models/
    userModel.js
  middlewares/
    errorHandler.js
    notFound.js
    requestLogger.js
  utils/
    apiResponse.js
    AppError.js
  app.js
server.js
package.json
README.md
.env
```

## Setup Instructions

### 1. Install dependencies

```bash
npm install
```

### 2. Install MongoDB Community Server

Install MongoDB Community Server on your machine and make sure the MongoDB service is running.

Default local MongoDB URL:

```text
mongodb://localhost:27017
```

This project uses this database:

```text
practice_api
```

MongoDB creates the `practice_api` database automatically when you insert your first user.

### 3. Configure environment variables

Create a `.env` file in the project root:

```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/practice_api
```

### 4. Run in development mode

```bash
npm run dev
```

### 5. Run in production mode

```bash
npm start
```

The API will run at:

```text
http://localhost:5000
```

When MongoDB connects successfully, the terminal should show:

```text
MongoDB connected: localhost
Server is running on http://localhost:5000
```

## Standard Response Format

Successful responses:

```json
{
  "success": true,
  "message": "Users fetched successfully",
  "data": []
}
```

Error responses:

```json
{
  "success": false,
  "message": "User not found",
  "data": null
}
```

## API Endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/api/users` | Get all users |
| GET | `/api/users/:id` | Get one user by MongoDB `_id` |
| POST | `/api/users` | Create a new user |
| PUT | `/api/users/:id` | Update an existing user |
| DELETE | `/api/users/:id` | Delete a user |

## User Fields

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `name` | String | Yes | User full name |
| `email` | String | Yes | Must be unique |
| `age` | Number | Yes | Cannot be negative |

## Postman Testing Examples

Use this base URL:

```text
http://localhost:5000
```

### 1. Get all users

- Method: `GET`
- URL: `http://localhost:5000/api/users`
- Body: none

Example response:

```json
{
  "success": true,
  "message": "Users fetched successfully",
  "data": [
    {
      "_id": "6846b26c7e5d1d4f8e1a1001",
      "name": "Ali Khan",
      "email": "ali@example.com",
      "age": 24,
      "createdAt": "2026-06-08T09:00:00.000Z",
      "updatedAt": "2026-06-08T09:00:00.000Z",
      "__v": 0
    }
  ]
}
```

### 2. Get user by ID

- Method: `GET`
- URL: `http://localhost:5000/api/users/6846b26c7e5d1d4f8e1a1001`
- Body: none

Use a real `_id` copied from the create user response or get all users response.

### 3. Create a user

- Method: `POST`
- URL: `http://localhost:5000/api/users`
- Headers:

```text
Content-Type: application/json
```

- Body, raw JSON:

```json
{
  "name": "Ahmed Raza",
  "email": "ahmed@example.com",
  "age": 31
}
```

Expected status code: `201 Created`

Example response:

```json
{
  "success": true,
  "message": "User created successfully",
  "data": {
    "name": "Ahmed Raza",
    "email": "ahmed@example.com",
    "age": 31,
    "_id": "6846b26c7e5d1d4f8e1a1002",
    "createdAt": "2026-06-08T09:10:00.000Z",
    "updatedAt": "2026-06-08T09:10:00.000Z",
    "__v": 0
  }
}
```

### 4. Update a user

- Method: `PUT`
- URL: `http://localhost:5000/api/users/6846b26c7e5d1d4f8e1a1002`
- Headers:

```text
Content-Type: application/json
```

- Body, raw JSON:

```json
{
  "name": "Ahmed Updated",
  "email": "ahmed.updated@example.com",
  "age": 32
}
```

Expected status code: `200 OK`

### 5. Delete a user

- Method: `DELETE`
- URL: `http://localhost:5000/api/users/6846b26c7e5d1d4f8e1a1002`
- Body: none

Expected status code: `200 OK`

### 6. Test validation error

- Method: `POST`
- URL: `http://localhost:5000/api/users`
- Body, raw JSON:

```json
{
  "name": "",
  "email": "bad@example.com",
  "age": -1
}
```

Expected status code: `400 Bad Request`

### 7. Test 404 route

- Method: `GET`
- URL: `http://localhost:5000/api/unknown`

Expected status code: `404 Not Found`

## How MongoDB Is Connected

- `server.js` loads `.env`
- `server.js` calls `connectDB()`
- `src/config/db.js` connects to MongoDB with `mongoose.connect(process.env.MONGO_URI)`
- `src/models/userModel.js` defines the User schema
- `src/controllers/userController.js` uses async Mongoose methods for CRUD

## Notes

- Keep MongoDB Community Server running before starting the API.
- The API now stores users permanently in MongoDB.
- Route URLs stayed the same, but user IDs are now MongoDB `_id` values instead of simple numbers.
