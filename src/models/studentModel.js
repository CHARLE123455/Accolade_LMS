"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const uuid_1 = require("uuid");
const studentSchema = new mongoose_1.default.Schema({
    id: {
        type: String,
        default: uuid_1.v4,
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
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'Teacher',
            required: true
        }
    ],
    books: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'Book'
        }
    ]
});
const Student = mongoose_1.default.model('Student', studentSchema);
exports.default = Student;
