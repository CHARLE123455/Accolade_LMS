import Teacher from "../models/teacherModel";
import Student from "../models/studentModel";
import mongoose from "mongoose";

export const getAllTeachersService = async () => {
    return await Teacher.find().populate("students");
};

export const getTeacherByIdService = async (id: string) => {
    return await Teacher.findById(id).populate("students");
};

export const getStudentsByTeacherService = async (teacherId: string) => {
    return await Student.find({ teachers: teacherId }).populate("teachers");
};

export const createTeacherService = async (
    firstName: string, 
    lastName: string, 
    email: string, 
    password: string, 
    subject: string
  ) => {
    const teacher = new Teacher({ firstName, lastName, email, password, subject });
    await teacher.save();
    return teacher;
  };

export const updateTeacherService = async (id: string, updateData: any) => {
    return await Teacher.findByIdAndUpdate(id, { $set: updateData }, { new: true }).populate("students");
};

export const deleteTeacherService = async (id: string) => {
    const teacher = await Teacher.findById(id);
    if (!teacher) return false;

    if (teacher.students && teacher.students.length > 0) {
        await Student.updateMany({ _id: { $in: teacher.students } }, { $pull: { teachers: teacher._id } });
    }

    await Teacher.findByIdAndDelete(id);
    return true;
};

export const addStudentToTeacherService = async (teacherId: string, studentId: string) => {
    const teacher = await Teacher.findById(teacherId);
    const student = await Student.findById(studentId);

    if (!teacher || !student) return false;

    if (!teacher.students.includes(new mongoose.Types.ObjectId(studentId))) {
        teacher.students.push(new mongoose.Types.ObjectId(studentId));
        await teacher.save();
    }

    if (!student.teachers.includes(new mongoose.Types.ObjectId(teacherId))) {
        student.teachers.push(new mongoose.Types.ObjectId(teacherId));
        await student.save();
    }

    return teacher;
};