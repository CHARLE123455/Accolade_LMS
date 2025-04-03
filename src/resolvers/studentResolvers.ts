import {
  getAllStudentsService,
  getStudentByIdService,
  createStudentService,
  updateStudentService,
  deleteStudentService,
  addTeacherToStudentService,
} from "../services/studentService";

const studentResolvers = {
  Query: {
    students: async () => await getAllStudentsService(),
    student: async (_: any, { id }: { id: string }) => await getStudentByIdService(id),
  },
  Mutation: {
    addStudent: async (
      _: any,
      { name, age, grade, teacherId }: { name: string; age: number; grade: string; teacherId: string }
    ) => {
      const student = await createStudentService(name, age, grade);
      if (teacherId) {
        await addTeacherToStudentService(student.id.toString(), teacherId);
      }
      return student;
    },
    updateStudent: async (
      _: any,
      { id, name, age, grade }: { id: string; name?: string; age?: number; grade?: string }
    ) => {
      const updateData: any = {};
      if (name) updateData.name = name;
      if (age) updateData.age = age;
      if (grade) updateData.grade = grade;

      return await updateStudentService(id, updateData);
    },
    deleteStudent: async (_: any, { id }: { id: string }) => {
      return await deleteStudentService(id);
    },
  },
  Student: {
    teachers: async (parent: any) => parent.teachers,
    books: async (parent: any) => parent.books,
  },
};

export default studentResolvers;
