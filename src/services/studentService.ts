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

export const createStudentService = async (firstName: string, lastName: string, age: number) => {
    const student = new Student({ firstName, lastName, age });
    await student.save();
    return student;
};

export const updateStudentService = async (id: string, updateData: any) => {
    return await Student.findByIdAndUpdate(id, { $set: updateData }, { new: true }).populate("teachers books");
};

export const deleteStudentService = async (id: string) => {
    const student = await Student.findById(id);
    if (!student) return false;

    if (student.teachers?.length > 0) {
        await Teacher.updateMany({ _id: { $in: student.teachers } }, { $pull: { students: student._id } });
    }

    await Student.findByIdAndDelete(id);
    return true;
};

export const addTeacherToStudentService = async (studentId: string, teacherId: string) => {
    const student = await Student.findById(studentId);
    const teacher = await Teacher.findById(teacherId);

    if (!student || !teacher) return false;

    const teacherObjId = new mongoose.Types.ObjectId(teacherId);
    const studentObjId = new mongoose.Types.ObjectId(studentId);

    if (!student.teachers.includes(teacherObjId)) {
        student.teachers.push(teacherObjId);
        await student.save();
    }

    if (!teacher.students) {
        teacher.students = [];
    }

    if (!teacher.students.includes(studentObjId)) {
        teacher.students.push(studentObjId);
        await teacher.save();
    }

    return student;
};
