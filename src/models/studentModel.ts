import mongoose, { Schema, Document } from "mongoose";
import { v4 as UUIDV4 } from "uuid";


export interface IStudent extends Document {
    firstName: string;
    lastName: string;
    age: Number;
    subject: string;
    teacher: mongoose.Types.ObjectId[];
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
        max: 30,
        trim: true
    },
    teacher:[
        {
            type: mongoose.Schema.Types.String,
            ref: 'Teacher' ,
            trim: true,
            required: true
        }
    ],
    books: [
        {
            type: mongoose.Schema.Types.UUID,
            ref: 'Book',
            trim: true,
            required: true
        }
    ]



})

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;