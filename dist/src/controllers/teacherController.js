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
exports.addStudentToTeacher = exports.deleteTeacher = exports.updateTeacher = exports.createTeacher = exports.getStudentsByTeacher = exports.getTeacherById = exports.getAllTeachers = void 0;
const teacherService_1 = require("../services/teacherService");
const getAllTeachers = (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const teachers = yield (0, teacherService_1.getAllTeachersService)();
        res.status(200).json(teachers);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch teachers" });
    }
});
exports.getAllTeachers = getAllTeachers;
const getTeacherById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const teacher = yield (0, teacherService_1.getTeacherByIdService)(id);
        if (!teacher) {
            res.status(404).json({ error: "Teacher not found" });
            return;
        }
        res.status(200).json(teacher);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch teacher" });
    }
});
exports.getTeacherById = getTeacherById;
const getStudentsByTeacher = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const students = yield (0, teacherService_1.getStudentsByTeacherService)(id);
        res.status(200).json(students);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch students" });
    }
});
exports.getStudentsByTeacher = getStudentsByTeacher;
const createTeacher = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstName, lastName, email, password, subject } = req.body;
        const teacher = yield (0, teacherService_1.createTeacherService)(firstName, lastName, email, password, subject);
        res.status(201).json(teacher);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to create teacher" });
    }
});
exports.createTeacher = createTeacher;
const updateTeacher = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const updateData = req.body;
        const updatedTeacher = yield (0, teacherService_1.updateTeacherService)(id, updateData);
        if (!updatedTeacher) {
            res.status(404).json({ error: "Teacher not found" });
            return;
        }
        res.status(200).json(updatedTeacher);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to update teacher" });
    }
});
exports.updateTeacher = updateTeacher;
const deleteTeacher = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deleted = yield (0, teacherService_1.deleteTeacherService)(id);
        if (!deleted) {
            res.status(404).json({ error: "Teacher not found" });
            return;
        }
        res.status(204).json({ message: "Teacher deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ error: "Failed to delete teacher" });
    }
});
exports.deleteTeacher = deleteTeacher;
const addStudentToTeacher = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { teacherId, studentId } = req.params;
        const updatedTeacher = yield (0, teacherService_1.addStudentToTeacherService)(teacherId, studentId);
        if (!updatedTeacher) {
            res.status(404).json({ error: "Teacher or Student not found" });
            return;
        }
        res.status(200).json(updatedTeacher);
        return;
    }
    catch (error) {
        res.status(500).json({ error: "Failed to add student to teacher" });
    }
});
exports.addStudentToTeacher = addStudentToTeacher;
