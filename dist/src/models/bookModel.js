"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const uuid_1 = require("uuid");
const bookSchema = new mongoose_1.default.Schema({
    id: {
        type: String,
        default: uuid_1.v4,
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
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Student',
        trim: true
    }
});
const Book = mongoose_1.default.model('Book', bookSchema);
exports.default = Book;
