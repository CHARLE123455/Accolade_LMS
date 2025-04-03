import mongoose, { Schema, Document } from "mongoose";
import { v4 as UUIDV4 } from "uuid";

export interface IBook extends Document {
  id: string;
  title: string;
  author: string;
  subject?: string;
  isbn: string;
  student?: mongoose.Types.ObjectId;
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
    trim: true
  },
  isbn: {
    type: String,
    trim: true,
    required: true
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    trim: true
  }
});

const Book = mongoose.model<IBook>('Book', bookSchema);
export default Book;