import Student from "../models/studentModel";
import Teacher from "../models/teacherModel";
import Book from "../models/bookModel";

const studentResolvers = {
  Query: {
    students: async () => await Student.find().populate("teachers books"),
    student: async (_: any, { id }: { id: string }) => await Student.findById(id).populate("teachers books"),
  },
  Mutation: {
    addStudent: async (
      _: any, 
      { firstName, lastName, age, teacherId }: 
      { firstName: string; lastName: string; age: number; teacherId: string }
    ) => {
      const student = new Student({ 
        firstName, 
        lastName, 
        age,
        teachers: [teacherId]
      });
      
      await student.save();

      await Teacher.findByIdAndUpdate(teacherId, { $push: { students: student._id } });

      return student;
    },
    updateStudent: async (
      _: any,
      { id, firstName, lastName, age }: 
      { id: string; firstName?: string; lastName?: string; age?: number }
    ) => {
      const updateData: any = {};
      if (firstName) updateData.firstName = firstName;
      if (lastName) updateData.lastName = lastName;
      if (age) updateData.age = age;
      
      const updatedStudent = await Student.findByIdAndUpdate(
        id,
        { $set: updateData },
        { new: true }
      ).populate("teachers books");
      
      return updatedStudent;
    },
    deleteStudent: async (_: any, { id }: { id: string }) => {
      const student = await Student.findById(id);
      
      if (!student) return false;
      
      await Teacher.updateMany(
        { students: student._id },
        { $pull: { students: student._id } }
      );
      
  
      await Book.updateMany(
        { student: student._id },
        { $unset: { student: "" } }
      );
      
      await Student.findByIdAndDelete(id);
      return true;
    }
  },
  Student: {
    teachers: async (parent: any) => {
      return await Teacher.find({ _id: { $in: parent.teachers } });
    },
    books: async (parent: any) => {
      return await Book.find({ _id: { $in: parent.books } });
    }
  }
};

export default studentResolvers;