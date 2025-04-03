import Student from "../models/studentModel";
import Teacher from "../models/teacherModel";
import mongoose from "mongoose";


export const getAllStudentsService = async () => {
    return await Student.find().populate("teachers books");
};

export const getStudentByIdService = async (id: string) => {
    return await Student.findById(id).populate("teachers books");
};

export const getStudentsByTeacherService = async (teacherId: string) => {
    return await Student.find({ teachers: teacherId }).populate("teachers books");
};

export const createStudentService = async (name: string, age: number, grade: string) => {
    const student = new Student({ name, age, grade });
    await student.save();
    return student;
};

export const updateStudentService = async (id: string, updateData: any) => {
    return await Student.findByIdAndUpdate(id, { $set: updateData }, { new: true }).populate("teachers books");
};

export const deleteStudentService = async (id: string) => {
    const student = await Student.findById(id);
    if (!student) return false;

    if (student.teachers && student.teachers.length > 0) {
        await Teacher.updateMany({ _id: { $in: student.teachers } }, { $pull: { students: student._id } });
    }

    await Student.findByIdAndDelete(id);
    return true;
};

export const addTeacherToStudentService = async (studentId: string, teacherId: string) => {
    const student = await Student.findById(studentId);
    const teacher = await Teacher.findById(teacherId);

    if (!student || !teacher) return false;

    if (!student.teachers.includes(new mongoose.Types.ObjectId(teacherId))) {
        student.teachers.push(new mongoose.Types.ObjectId(teacherId));
        await student.save();
    }

    if (!teacher.students.includes(new mongoose.Types.ObjectId(studentId))) {
        teacher.students.push(new mongoose.Types.ObjectId(studentId));
        await teacher.save();
    }

    return student;
};