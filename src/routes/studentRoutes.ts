import express from "express";
import Student from "../models/student.model";

const router = express.Router();

router.get("/", async (_, res) => {
  const students = await Student.find().populate("teacher books");
  res.json(students);
});

router.post("/", async (req, res) => {
  const { name, age, teacherId } = req.body;
  const student = new Student({ name, age, teacher: teacherId });
  await student.save();
  res.status(201).json(student);
});

export default router;
