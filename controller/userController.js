import UserModel from "../model/userModel.js";
import jwt from "jsonwebtoken"
import envConfig from "../config/envConfig.js"
import bcrypt from "bcryptjs";

const {JWT_SECRET} = envConfig
const minPasswordLength = 6

// Register User
export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body

        // Check if there is no email or password
        if(!name || !email || !password) return res.status(400).json({success: false,message: "Provide required credentials"})

        if(password.length<minPasswordLength) return res.status(400).json({success:false, message: "Password length should be minimum of 6."})
        
        // Check existing user
        const existingUser = await UserModel.findOne({email})
        if(existingUser) return res.status(400).json({success: false, message: "User already exists"})

        // Hashing password using bcrypt
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        // Saving new user and displaying the user data except the password
        const newUser = new UserModel({name, email, password: hashedPassword})
        const savedUser = await newUser.save()
        const userObject = savedUser.toObject()
        delete userObject.password
        
        return res.status(201).json({success: true, data: userObject})
    } catch (error) {
        res.status(500).json({success: false, message: `Internal Server Error: ${error.message}`})
    }
}

export const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body
        if(!email || !password) return res.status(400).json({success: false, message: "Both email and password are required"})
        
        const user = await UserModel.findOne({email})
        
        if(!user) return res.status(401).json({success:false, message: "No user found..."})

        const isPasswordMatched = await bcrypt.compare(password,user.password)
        if(!isPasswordMatched) return res.status(401).json({success: false, message: "Invalid credentials."})

        const token = jwt.sign(
            {userId: user._id}, 
            JWT_SECRET,
            {expiresIn: "24h"}
        )

        const { password: _, ...userObject} = user.toObject()

        // Set the token in the header
        res.setHeader("Authorization", `Bearer ${token}`)

        res.status(200).json({success: true, token, user: userObject})
    } catch (error) {
        res.status(500).json({success: false, message: `Internal Server Error: ${error.message}`})
    }
}

export const userInfo = async (req, res) => {
    try {
        return res.status(200).json({success: true, data: req.user})

    } catch (error) {
        res.status(500).json({success: false, message: `Internal Server Error: ${error.message}`})
    }
}