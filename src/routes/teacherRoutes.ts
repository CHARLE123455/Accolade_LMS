import express from "express";
import Teacher from "../models/teacherModel";

const router = express.Router();

router.get("/", async (_, res) => {
  const teachers = await Teacher.find().populate("students");
  res.json(teachers);
});

router.post("/", async (req, res) => {
  const { name, subject } = req.body;
  const teacher = new Teacher({ name, subject });
  await teacher.save();
  res.status(201).json(teacher);
});

export default router;
