import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const connectionString = process.env.MONGODB_URI;
if (!connectionString) {
    throw new Error("MONGODB_URI is not defined in the environment variables");
}

async function connectDB() {
    try {
        await mongoose.connect(connectionString as string);
        console.log("Database connected successfully");
    } catch (err: any) {
        throw new Error("Database connection failed: " + err.message);
    }
}

connectDB();

export default mongoose;
