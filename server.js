import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import envConfig from "./config/envConfig.js"
import UserModel from "./model/userModel.js"
import userRouter from "./routes/userRoute.js"

const {PORT, MONGODB_URI, MONGODB_COLLECTION} = envConfig

const app = express()

// Middlewares
app.use(cors({
    credentials: true,
    exposedHeaders: ["Authorization"]
}))
app.use(express.json())

// Routes
app.use("/api", userRouter)

// Error handler


// Server
mongoose.connect(`${MONGODB_URI}/${MONGODB_COLLECTION}`)
    .then(() => {
        console.info("Connected to MONGODB")
        UserModel.createIndexes()
        app.listen(PORT, () => console.info("Server running on Port: "+PORT))
    })
    .catch(error => {
        console.error(error)
    })

