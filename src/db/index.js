import mongoose from 'mongoose';
import {DB_NAME} from '../constants.js';

const connectDB = async ()=>{
    try {
        const promise = await mongoose.connect(`${process.env.DATABASE_URL}/${DB_NAME}`);
        console.log(`MongoDB connected ${promise.connection.host}`);
    } catch (error) {
        console.log("MongoDB connection error", error);
        throw error;
    }
    
}

export default connectDB;
