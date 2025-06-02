import dotenv from 'dotenv'
import connectDB from './db/index.js'
dotenv.config()

connectDB()
.then(()=>{
    app.on("error",(err)=>{
        console.log("App connection Error!!!",err)
        throw err
    })
    app.listen(process.env.PORT || 8000,()=>{
        console.log(`Server is running on port ${process.env.PORT}`)
    })
})
.catch((err)=>{
    console.log("MongoDB Connection Error!!!",err)
    process.exit(1);
})

/*
import mongoose from 'mongoose';
import { DB_NAME } from './constants';

import express from 'express';
const app = express();

( async () =>{
    try {
        await mongoose.connect(`${process.env.DATABASE_URL}/${DB_NAME}`)

        app.on('error', (error) => {
            console.error('Connection error',error);
            throw error;
        })

        app.listen(process.env.PORT,()=>{
            console.log(`Server is running on port ${process.env.PORT}`);
        })

    } catch (error) {
        console.error('Error', error);
        throw error;
    }
})();
*/




