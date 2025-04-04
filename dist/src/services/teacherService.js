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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addStudentToTeacherService = exports.deleteTeacherService = exports.updateTeacherService = exports.createTeacherService = exports.getStudentsByTeacherService = exports.getTeacherByIdService = exports.getAllTeachersService = void 0;
const teacherModel_1 = __importDefault(require("../models/teacherModel"));
const studentModel_1 = __importDefault(require("../models/studentModel"));
const mongoose_1 = __importDefault(require("mongoose"));
const getAllTeachersService = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield teacherModel_1.default.find().populate("students");
});
exports.getAllTeachersService = getAllTeachersService;
const getTeacherByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield teacherModel_1.default.findById(id).populate("students");
});
exports.getTeacherByIdService = getTeacherByIdService;
const getStudentsByTeacherService = (teacherId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield studentModel_1.default.find({ teachers: teacherId }).populate("teachers");
});
exports.getStudentsByTeacherService = getStudentsByTeacherService;
const createTeacherService = (firstName, lastName, email, password, subject) => __awaiter(void 0, void 0, void 0, function* () {
    const teacher = new teacherModel_1.default({ firstName, lastName, email, password, subject });
    yield teacher.save();
    return teacher;
});
exports.createTeacherService = createTeacherService;
const updateTeacherService = (id, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    return yield teacherModel_1.default.findByIdAndUpdate(id, { $set: updateData }, { new: true }).populate("students");
});
exports.updateTeacherService = updateTeacherService;
const deleteTeacherService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const teacher = yield teacherModel_1.default.findById(id);
    if (!teacher)
        return false;
    if (teacher.students && teacher.students.length > 0) {
        yield studentModel_1.default.updateMany({ _id: { $in: teacher.students } }, { $pull: { teachers: teacher._id } });
    }
    yield teacherModel_1.default.findByIdAndDelete(id);
    return true;
});
exports.deleteTeacherService = deleteTeacherService;
const addStudentToTeacherService = (teacherId, studentId) => __awaiter(void 0, void 0, void 0, function* () {
    const teacher = yield teacherModel_1.default.findById(teacherId);
    const student = yield studentModel_1.default.findById(studentId);
    if (!teacher || !student)
        return false;
    if (!teacher.students.includes(new mongoose_1.default.Types.ObjectId(studentId))) {
        teacher.students.push(new mongoose_1.default.Types.ObjectId(studentId));
        yield teacher.save();
    }
    if (!student.teachers.includes(new mongoose_1.default.Types.ObjectId(teacherId))) {
        student.teachers.push(new mongoose_1.default.Types.ObjectId(teacherId));
        yield student.save();
    }
    return teacher;
});
exports.addStudentToTeacherService = addStudentToTeacherService;
