import mongoose, { Schema, Document } from "mongoose";
import { v4 as UUIDV4} from 'uuid';

export interface ITeacher extends Document {
    firstName: string;
    lastName: string;
    email: String;
    password:String;
    subject: string;
    student: mongoose.Types.ObjectId[];    
  }


const teacherSchema: Schema = new mongoose.Schema({
    id: {
        type: String,
        default: UUIDV4,
        trim: true,           
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    student: {
        type: mongoose.Schema.Types.UUID,
        ref: 'Student',
        trim: true,
    },
    subject: {
        type: String,
        required: true,
        trim: true,
    }
})

const Teacher = mongoose.model('Teacher', teacherSchema);
module.exports(Teacher);