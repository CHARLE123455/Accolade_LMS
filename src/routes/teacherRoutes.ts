import { Router } from "express";
import {
  getAllTeachers,
  getTeacherById,
  getStudentsByTeacher,
  createTeacher,
  updateTeacher,
  deleteTeacher,
  addStudentToTeacher,
} from "../controllers/teacherController";

const router = Router();

router.get("/teachers", getAllTeachers);
router.get("/teachers/:id", getTeacherById);
router.get("/teachers/:id/students", getStudentsByTeacher);
router.post("/teachers", createTeacher);
router.put("/teachers/:id", updateTeacher);
router.delete("/teachers/:id", deleteTeacher);
router.post("/teachers/:teacherId/students/:studentId", addStudentToTeacher);

export default router;
