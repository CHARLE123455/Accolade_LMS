import express from "express";
import {
  getAllStudents,
  getStudentById,
  getStudentsByTeacher,
  createStudent,
  updateStudent,
  deleteStudent,
  addTeacherToStudent,
} from "../controllers/studentController";

const router = express.Router();

router.get("/students", getAllStudents);
router.get("/students/:id", getStudentById);
router.get("/students/teacher/:teacherId", getStudentsByTeacher);
router.post("/students", createStudent);
router.put("/students/:id", updateStudent);
router.delete("/students/:id", deleteStudent);
router.post("/students/:studentId/teachers/:teacherId", addTeacherToStudent);

export default router;