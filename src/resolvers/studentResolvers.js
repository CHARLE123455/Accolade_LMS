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
const studentService_1 = require("../services/studentService");
const studentResolvers = {
    Query: {
        students: () => __awaiter(void 0, void 0, void 0, function* () { return yield (0, studentService_1.getAllStudentsService)(); }),
        student: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { id }) { return yield (0, studentService_1.getStudentByIdService)(id); }),
    },
    Mutation: {
        addStudent: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { firstName, lastName, age, teacherId }) {
            const student = yield (0, studentService_1.createStudentService)(firstName, lastName, age);
            if (teacherId) {
                yield (0, studentService_1.addTeacherToStudentService)(student.id.toString(), teacherId);
            }
            return student;
        }),
        updateStudent: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { id, firstName, lastName, age }) {
            const updateData = {};
            if (firstName)
                updateData.firstName = firstName;
            if (lastName)
                updateData.lastName = lastName;
            if (age)
                updateData.age = age;
            return yield (0, studentService_1.updateStudentService)(id, updateData);
        }),
        deleteStudent: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { id }) {
            return yield (0, studentService_1.deleteStudentService)(id);
        }),
    },
    Student: {
        teachers: (parent) => __awaiter(void 0, void 0, void 0, function* () {
            return yield parent.populate("teachers").then((s) => s.teachers);
        }),
        books: (parent) => __awaiter(void 0, void 0, void 0, function* () {
            return yield parent.populate("books").then((s) => s.books);
        }),
    },
};
exports.default = studentResolvers;
