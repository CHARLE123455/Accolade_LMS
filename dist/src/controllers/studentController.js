"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addTeacherToStudent = exports.deleteStudent = exports.updateStudent = exports.createStudent = exports.getStudentsByTeacher = exports.getStudentById = exports.getAllStudents = void 0;
const studentService_1 = require("../services/studentService");
const getAllStudents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const students = yield (0, studentService_1.getAllStudentsService)();
        res.status(200).json(students);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching students", error });
    }
});
exports.getAllStudents = getAllStudents;
const getStudentById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const student = yield (0, studentService_1.getStudentByIdService)(id);
        if (!student) {
            res.status(404).json({ message: "Student not found" });
            return;
        }
        res.status(200).json(student);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching student", error });
    }
});
exports.getStudentById = getStudentById;
const getStudentsByTeacher = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { teacherId } = req.params;
        const students = yield (0, studentService_1.getStudentsByTeacherService)(teacherId);
        res.status(200).json(students);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching students for teacher", error });
    }
});
exports.getStudentsByTeacher = getStudentsByTeacher;
const createStudent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstName, lastName, age } = req.body;
        if (!firstName || !lastName || !age) {
            res.status(400).json({ message: "All fields are required" });
            return;
        }
        const student = yield (0, studentService_1.createStudentService)(firstName, lastName, age);
        res.status(201).json(student);
    }
    catch (error) {
        res.status(500).json({ message: "Error creating student", error });
    }
});
exports.createStudent = createStudent;
const updateStudent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const updateData = req.body;
        const updatedStudent = yield (0, studentService_1.updateStudentService)(id, updateData);
        if (!updatedStudent) {
            res.status(404).json({ message: "Student not found" });
            return;
        }
        res.status(200).json(updatedStudent);
    }
    catch (error) {
        res.status(500).json({ message: "Error updating student", error });
    }
});
exports.updateStudent = updateStudent;
const deleteStudent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const success = yield (0, studentService_1.deleteStudentService)(id);
        if (!success) {
            res.status(404).json({ message: "Student not found" });
            return;
        }
        res.status(204).json({ message: "Student deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Error deleting student", error });
    }
});
exports.deleteStudent = deleteStudent;
const addTeacherToStudent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { studentId, teacherId } = req.params;
        const student = yield (0, studentService_1.addTeacherToStudentService)(studentId, teacherId);
        if (!student) {
            res.status(404).json({ message: "Student or teacher not found" });
            return;
        }
        res.status(200).json(student);
    }
    catch (error) {
        res.status(500).json({ message: "Error adding teacher to student", error });
    }
});
exports.addTeacherToStudent = addTeacherToStudent;
