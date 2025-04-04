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

router.get("/all", getAllStudents);
router.get("/:id", getStudentById);
router.get("/teacher/:teacherId", getStudentsByTeacher);
router.post("/create", createStudent);
router.patch("/update/:id", updateStudent);
router.delete("/:id", deleteStudent);
router.post("/:studentId/teachers/:teacherId", addTeacherToStudent);

export default router;