import { Request, Response, NextFunction } from "express";
import {
  getAllTeachersService,
  getTeacherByIdService,
  getStudentsByTeacherService,
  createTeacherService,
  updateTeacherService,
  deleteTeacherService,
  addStudentToTeacherService,
} from "../services/teacherService";

export const getAllTeachers = async (_: Request, res: Response) => {
  try {
    const teachers = await getAllTeachersService();
    res.status(200).json(teachers);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch teachers" });
  }
};

export const getTeacherById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const teacher = await getTeacherByIdService(id);
    if (!teacher) {
      res.status(404).json({ error: "Teacher not found" });
      return;
    }
    res.status(200).json(teacher);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch teacher" });
  }
};

export const getStudentsByTeacher = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const students = await getStudentsByTeacherService(id);
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch students" });
  }
};

export const createTeacher = async (req: Request, res: Response,next: NextFunction): Promise<void> => {
  try {
    const { firstName, lastName, email, password, subject } = req.body;
    const teacher = await createTeacherService(firstName, lastName, email, password, subject);
    res.status(201).json(teacher);
  } catch (error) {
    res.status(500).json({ error: "Failed to create teacher" });
  }
};

export const updateTeacher = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const updatedTeacher = await updateTeacherService(id, updateData);
    if (!updatedTeacher) {
      res.status(404).json({ error: "Teacher not found" });
      return;
    }
    res.status(200).json(updatedTeacher);
  } catch (error) {
    res.status(500).json({ error: "Failed to update teacher" });
  }
};

export const deleteTeacher = async (req: Request, res: Response,next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const deleted = await deleteTeacherService(id);
    if (!deleted) {
      res.status(404).json({ error: "Teacher not found" });
      return;
    }
    res.status(204).json({ message: "Teacher deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete teacher" });
  }
};

export const addStudentToTeacher = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { teacherId, studentId } = req.params;
    const updatedTeacher = await addStudentToTeacherService(teacherId, studentId);
    if (!updatedTeacher) {
      res.status(404).json({ error: "Teacher or Student not found" });
      return;
    }
    res.status(200).json(updatedTeacher);
    return;
  } catch (error) {
    res.status(500).json({ error: "Failed to add student to teacher" });
  }
};
