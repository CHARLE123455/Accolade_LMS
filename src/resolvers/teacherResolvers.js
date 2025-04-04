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
const teacherService_1 = require("../services/teacherService");
const teacherResolvers = {
    Query: {
        teachers: () => __awaiter(void 0, void 0, void 0, function* () { return yield (0, teacherService_1.getAllTeachersService)(); }),
        teacher: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { id }) { return yield (0, teacherService_1.getTeacherByIdService)(id); }),
    },
    Mutation: {
        addTeacher: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { firstName, lastName, email, password, subject }) {
            return yield (0, teacherService_1.createTeacherService)(firstName, lastName, email, password, subject);
        }),
        updateTeacher: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { id, updateData }) {
            return yield (0, teacherService_1.updateTeacherService)(id, updateData);
        }),
        deleteTeacher: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { id }) {
            return yield (0, teacherService_1.deleteTeacherService)(id);
        }),
        addStudentToTeacher: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { teacherId, studentId }) {
            return yield (0, teacherService_1.addStudentToTeacherService)(teacherId, studentId);
        }),
    },
    Teacher: {
        students: (parent) => __awaiter(void 0, void 0, void 0, function* () { return yield (0, teacherService_1.getStudentsByTeacherService)(parent._id); }),
    },
};
exports.default = teacherResolvers;
