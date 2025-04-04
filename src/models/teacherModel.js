"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const uuid_1 = require("uuid");
const teacherSchema = new mongoose_1.default.Schema({
    id: {
        type: String,
        default: uuid_1.v4,
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
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'Student'
        }
    ]
});
const Teacher = mongoose_1.default.model('Teacher', teacherSchema);
exports.default = Teacher;
