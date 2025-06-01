import mongoose from 'mongoose'
import {DB_NAME} from '../constants.js'

const connectDB = async ()=>{
    try {
        const promise = await mongoose.connect(`${process.env.DATABASE_URL}/${DB_NAME}`)
        console.log(`DBMongo connected ${promise.connection.host}`)
    } catch (error) {
        console.log("MongoDB connection error", error)
        process.exit(1)
    }
    
}

export default connectDB
