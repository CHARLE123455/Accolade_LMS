import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI is not defined in environment variables');
}
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to Database successfully !!!'))


app.use(cors());

// Middleware
app.use(cors());
app.use(express.json());

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});