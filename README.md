# 🔐 Authentication System (Node.js + Express + MongoDB)

A secure user authentication system built using **Node.js**, **Express**, **MongoDB**, and **JWT**, with password hashing using **bcryptjs**.

## 🚀 Features

- ✅ User Registration with hashed password
- ✅ User Login with JWT token generation
- ✅ Protected route to fetch authenticated user info
- ✅ Token verification middleware
- ✅ Token sent via response headers
- 🔒 Password validation (min length)
- 🌐 CORS enabled

## 🧠 Technologies Used

- **Node.js**
- **Express.js**
- **MongoDB + Mongoose**
- **JWT (jsonwebtoken)**
- **bcryptjs**
- **dotenv**
- **CORS**

---
## 📁 Project Structure
```bash
/controllers      → Route logic (register, login, userInfo)
/models           → Mongoose schema
/routes           → Express routes
/middleware       → Auth middleware
/config           → Environment config
index.js          → Entry point (for local use)
vercel.json       → Deployment config
```

## 🛠️ API Endpoints

### 🔸 `POST /api/register`

Register a new user.

#### Request Body:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "secure123"
}
```

### 🔸 `POST /api/login`

Authenticate user and return token.

#### Request Body:
```json
{
  "email": "john@example.com",
  "password": "secure123"
}
```

#### Response Headers:
Authorization: Bearer <jwt_token_here>

### 🔸 `GET /api/me`

Fetch authenticated user info.

#### Headers:
Authorization: Bearer <jwt_token_here>

## ⚙️ Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/fardin-Sachi/authentication-system
cd authentication-system
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables

Create a .env file in the root:

PORT=port
MONGO_URI=mongodb_connection_string
MONGODB_COLLECTION=mongodb_collection_name
JWT_SECRET=jwt_secret

### 4. Run the app in the dev server
```bash
npm run dev
```
Or in the node server
```bash
npm start
```

## 🌐 Deployment

This project is deployed on Vercel. Live API Link: **https://authentication-system-rho-steel.vercel.app/**

## Postman Collection

**https://restless-shadow-762037.postman.co/workspace/My-Workspace~63b58fa8-c876-4274-8dc1-174b9d6814e5/request/29208220-042ea97c-7460-46cf-983d-0c6548419efe?action=share&creator=29208220&ctx=documentation**

## 🙋‍♂️ Author
Developed by Fardin Ahsan
