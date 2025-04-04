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

router.get("/all", getAllTeachers);
router.get("/:id", getTeacherById);
router.get("/:id/students", getStudentsByTeacher);
router.post("/create", createTeacher);
router.patch("/:id", updateTeacher);
router.delete("/:id", deleteTeacher);
router.post("/:teacherId/students/:studentId", addStudentToTeacher);

export default router;
