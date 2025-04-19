
import dotenv from 'dotenv';

dotenv.config();
import mongoose from "mongoose"

const connectDb=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL)
    } catch (error) {
        console.log(error)
        
    }

}


export default connectDb