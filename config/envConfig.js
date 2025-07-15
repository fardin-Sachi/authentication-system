import 'dotenv/config'

const config = {
    PORT: process.env.PORT,
    MONGODB_URI: process.env.MONGODB_URI,
    MONGODB_COLLECTION: process.env.MONGODB_COLLECTION,
    JWT_SECRET: process.env.JWT_SECRET,
    
}

export default config