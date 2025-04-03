import mongoose, { Schema, Document } from "mongoose";
import { v4 as UUIDV4 } from "uuid";

export interface IStudent extends Document {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  teachers: mongoose.Types.ObjectId[];
  books: mongoose.Types.ObjectId[];
}

const studentSchema: Schema = new mongoose.Schema({
  id: {
    type: String,
    default: UUIDV4,
    trim: true
  },
  firstName: {
    type: String,
    trim: true,
    required: true
  },
  lastName: {
    type: String,
    trim: true,
    required: true
  },
  age: {
    type: Number,
    required: true,
    min: 13,
    max: 30
  },
  teachers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Teacher',
      required: true
    }
  ],
  books: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Book'
    }
  ]
});

const Student = mongoose.model<IStudent>('Student', studentSchema);
export default Student;