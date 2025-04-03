import mongoose, { Schema, Document } from "mongoose";
import { v4 as UUIDV4 } from "uuid";

export interface ITeacher extends Document {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  subject: string;
  students: mongoose.Types.ObjectId[];
}

const teacherSchema: Schema = new mongoose.Schema({
  id: {
    type: String,
    default: UUIDV4,
    trim: true
  },
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  subject: {
    type: String,
    required: true,
    trim: true
  },
  students: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student'
    }
  ]
});

const Teacher = mongoose.model<ITeacher>('Teacher', teacherSchema);
export default Teacher;