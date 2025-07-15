import express from "express"
import { loginUser, registerUser, userInfo } from "../controller/userController.js"
import { authenticateToken } from "../middleware/auth.middleware.js"


const router = express.Router()

// Register new user
router.post("/register", registerUser)

// Login with email and password
router.post("/login", loginUser)

// Protected user info route
router.get("/me", authenticateToken, userInfo)


export default router