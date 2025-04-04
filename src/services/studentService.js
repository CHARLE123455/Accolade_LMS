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
exports.addTeacherToStudentService = exports.deleteStudentService = exports.updateStudentService = exports.createStudentService = exports.getStudentsByTeacherService = exports.getStudentByIdService = exports.getAllStudentsService = void 0;
const studentModel_1 = __importDefault(require("../models/studentModel"));
const teacherModel_1 = __importDefault(require("../models/teacherModel"));
const mongoose_1 = __importDefault(require("mongoose"));
const getAllStudentsService = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield studentModel_1.default.find().populate("teachers books");
});
exports.getAllStudentsService = getAllStudentsService;
const getStudentByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield studentModel_1.default.findById(id).populate("teachers books");
});
exports.getStudentByIdService = getStudentByIdService;
const getStudentsByTeacherService = (teacherId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield studentModel_1.default.find({ teachers: teacherId }).populate("teachers books");
});
exports.getStudentsByTeacherService = getStudentsByTeacherService;
const createStudentService = (firstName, lastName, age) => __awaiter(void 0, void 0, void 0, function* () {
    const student = new studentModel_1.default({ firstName, lastName, age });
    yield student.save();
    return student;
});
exports.createStudentService = createStudentService;
const updateStudentService = (id, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    return yield studentModel_1.default.findByIdAndUpdate(id, { $set: updateData }, { new: true }).populate("teachers books");
});
exports.updateStudentService = updateStudentService;
const deleteStudentService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const student = yield studentModel_1.default.findById(id);
    if (!student)
        return false;
    if (((_a = student.teachers) === null || _a === void 0 ? void 0 : _a.length) > 0) {
        yield teacherModel_1.default.updateMany({ _id: { $in: student.teachers } }, { $pull: { students: student._id } });
    }
    yield studentModel_1.default.findByIdAndDelete(id);
    return true;
});
exports.deleteStudentService = deleteStudentService;
const addTeacherToStudentService = (studentId, teacherId) => __awaiter(void 0, void 0, void 0, function* () {
    const student = yield studentModel_1.default.findById(studentId);
    const teacher = yield teacherModel_1.default.findById(teacherId);
    if (!student || !teacher)
        return false;
    const teacherObjId = new mongoose_1.default.Types.ObjectId(teacherId);
    const studentObjId = new mongoose_1.default.Types.ObjectId(studentId);
    if (!student.teachers.includes(teacherObjId)) {
        student.teachers.push(teacherObjId);
        yield student.save();
    }
    if (!teacher.students) {
        teacher.students = [];
    }
    if (!teacher.students.includes(studentObjId)) {
        teacher.students.push(studentObjId);
        yield teacher.save();
    }
    return student;
});
exports.addTeacherToStudentService = addTeacherToStudentService;
