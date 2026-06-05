# Express MVC Users REST API

A complete beginner-friendly REST API project using Node.js, Express.js, and MVC architecture. The API uses hard-coded in-memory data, so no database setup is required.

## Features

- Express.js server
- MVC folder structure
- CRUD APIs for users
- In-memory user data
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

### 2. Configure environment variables

Create a `.env` file in the project root:

```env
PORT=5000
NODE_ENV=development
```

### 3. Run in development mode

```bash
npm run dev
```

### 4. Run in production mode

```bash
npm start
```

The API will run at:

```text
http://localhost:5000
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
| GET | `/api/users/:id` | Get one user by ID |
| POST | `/api/users` | Create a new user |
| PUT | `/api/users/:id` | Update an existing user |
| DELETE | `/api/users/:id` | Delete a user |

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
      "id": 1,
      "name": "Ali Khan",
      "email": "ali@example.com",
      "age": 24
    }
  ]
}
```

### 2. Get user by ID

- Method: `GET`
- URL: `http://localhost:5000/api/users/1`
- Body: none

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

### 4. Update a user

- Method: `PUT`
- URL: `http://localhost:5000/api/users/1`
- Headers:

```text
Content-Type: application/json
```

- Body, raw JSON:

```json
{
  "name": "Ali Updated",
  "email": "ali.updated@example.com",
  "age": 25
}
```

Expected status code: `200 OK`

### 5. Delete a user

- Method: `DELETE`
- URL: `http://localhost:5000/api/users/1`
- Body: none

Expected status code: `200 OK`

### 6. Test 404 route

- Method: `GET`
- URL: `http://localhost:5000/api/unknown`

Expected status code: `404 Not Found`

## Notes

- This project does not use a database yet.
- User data is reset whenever the server restarts.
- The model file can later be replaced with database logic without changing the route URLs.
