import mongoose,{ Schema, Document } from "mongoose";
import { v4 as UUIDV4 } from "uuid";

export interface IBook extends Document {
    title: String;
    author: String;
    subject: String;
    isbn: String;
    student: mongoose.Types.ObjectId[];
    
  }


const bookSchema: Schema = new mongoose.Schema({
    id: {
        type: String, 
        default: UUIDV4,
        trim: true
    },
    title: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    author: {
        type: String,
        trim: true,
        required: true
    },
    subject: {
        type: String,
        trim: true,
    },
    isbn: {
        type: String,
        trim: true,
        required: true
    },
});

const Book = mongoose.model('Book', bookSchema);
export default Book;