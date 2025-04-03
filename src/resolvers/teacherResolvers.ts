import Teacher from "../models/teacherModel";
import Student from "../models/studentModel";

const teacherResolvers = {
  Query: {
    teachers: async () => await Teacher.find().populate("students"),
    teacher: async (_: any, { id }: { id: string }) => await Teacher.findById(id).populate("students"),
  },
  Mutation: {
    addTeacher: async (
      _: any, 
      { firstName, lastName, email, password, subject }: 
      { firstName: string; lastName: string; email: string; password: string; subject: string }
    ) => {
      const teacher = new Teacher({ 
        firstName, 
        lastName, 
        email,
        password,
        subject 
      });
      return await teacher.save();
    },
    updateTeacher: async (
      _: any,
      { id, firstName, lastName, email, subject }: 
      { id: string; firstName?: string; lastName?: string; email?: string; subject?: string }
    ) => {
      const updateData: any = {};
      if (firstName) updateData.firstName = firstName;
      if (lastName) updateData.lastName = lastName;
      if (email) updateData.email = email;
      if (subject) updateData.subject = subject;
      
      const updatedTeacher = await Teacher.findByIdAndUpdate(
        id,
        { $set: updateData },
        { new: true }
      ).populate("students");
      
      return updatedTeacher;
    },
    deleteTeacher: async (_: any, { id }: { id: string }) => {
      const teacher = await Teacher.findById(id);
      
      if (!teacher) return false;
      
      await Student.updateMany(
        { teachers: teacher._id },
        { $pull: { teachers: teacher._id } }
      );
      
      await Teacher.findByIdAndDelete(id);
      return true;
    }
  },
  Teacher: {
    students: async (parent: any) => {
      if (!parent.students || parent.students.length === 0) return [];
      return await Student.find({ _id: { $in: parent.students } });
    }
  }
};

export default teacherResolvers;