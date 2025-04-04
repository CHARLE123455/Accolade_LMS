import { Request, Response, NextFunction } from "express";
import {
  getAllStudentsService,
  getStudentByIdService,
  getStudentsByTeacherService,
  createStudentService,
  updateStudentService,
  deleteStudentService,
  addTeacherToStudentService,
} from "../services/studentService";

export const getAllStudents = async (req: Request, res: Response ) => {
  try {
    const students = await getAllStudentsService();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: "Error fetching students", error });
  }
};

export const getStudentById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const student = await getStudentByIdService(id);
    if (!student) {
      res.status(404).json({ message: "Student not found" });
      return;
    }

    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: "Error fetching student", error });
  }
};

export const getStudentsByTeacher = async (req: Request, res: Response) => {
  try {
    const { teacherId } = req.params;
    const students = await getStudentsByTeacherService(teacherId);
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: "Error fetching students for teacher", error });
  }
};

export const createStudent = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { firstName, lastName, age } = req.body;
    if (!firstName || !lastName || !age) {
       res.status(400).json({ message: "All fields are required" });
       return;
    }

    const student = await createStudentService(firstName, lastName, age);
    res.status(201).json(student);
  } catch (error) {
    res.status(500).json({ message: "Error creating student", error });
  }
};

export const updateStudent = async (req: Request, res: Response,next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedStudent = await updateStudentService(id, updateData);
    if (!updatedStudent) {
      res.status(404).json({ message: "Student not found" });
      return;
    }

    res.status(200).json(updatedStudent);
  } catch (error) {
    res.status(500).json({ message: "Error updating student", error });
  }
};

export const deleteStudent = async (req: Request, res: Response,next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const success = await deleteStudentService(id);
    if (!success) {
      res.status(404).json({ message: "Student not found" });
      return;
    }

    res.status(204).json({ message: "Student deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting student", error });
  }
};

export const addTeacherToStudent = async (req: Request, res: Response,next: NextFunction): Promise<void> => {
  try {
    const { studentId, teacherId } = req.params;
    const student = await addTeacherToStudentService(studentId, teacherId);
    if (!student) {
      res.status(404).json({ message: "Student or teacher not found" });
      return;
    }

    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: "Error adding teacher to student", error });
  }
};
