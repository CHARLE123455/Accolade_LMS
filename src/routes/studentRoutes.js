"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const studentController_1 = require("../controllers/studentController");
const router = express_1.default.Router();
router.get("/all", studentController_1.getAllStudents);
router.get("/:id", studentController_1.getStudentById);
router.get("/teacher/:teacherId", studentController_1.getStudentsByTeacher);
router.post("/create", studentController_1.createStudent);
router.patch("/update/:id", studentController_1.updateStudent);
router.delete("/:id", studentController_1.deleteStudent);
router.post("/:studentId/teachers/:teacherId", studentController_1.addTeacherToStudent);
exports.default = router;
