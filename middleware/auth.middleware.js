import jwt from "jsonwebtoken"
import envConfig from "../config/envConfig.js"
import UserModel from "../model/userModel.js"

const {JWT_SECRET} = envConfig

export const authenticateToken = async (req, res, next) => {
    const authHeader = req.headers["authorization"]
    
    const token = authHeader && authHeader.split(" ")[1]
    if(!token) return res.status(401).json({success: false, message: "Access denied, no token found."})
    
    try {
        const decodedToken = jwt.verify(token, JWT_SECRET)
        
        req.user = await UserModel.findById(decodedToken.userId).select("-password")
        if(!req.user) return res.status(401).json({success: false, message: "User not found due to invalid token."})
        
        next()
    } catch (error) {
        return res.status(500).json({success: false, message: `Internal Server Error: ${error.message}`})
    }
}