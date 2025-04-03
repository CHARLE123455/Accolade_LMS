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
      { firstName, lastName, age, teacherId }: 
      { firstName: string; lastName: string; age: number; teacherId?: string }
    ) => {
      const student = await createStudentService(firstName, lastName, age);

      if (teacherId) {
        await addTeacherToStudentService(student.id.toString(), teacherId);
      }
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

      return await updateStudentService(id, updateData);
    },
    deleteStudent: async (_: any, { id }: { id: string }) => {
      return await deleteStudentService(id);
    },
  },
  Student: {
    teachers: async (parent: any) => {
      return await parent.populate("teachers").then((s: any) => s.teachers);
    },
    books: async (parent: any) => {
      return await parent.populate("books").then((s: any) => s.books);
    },
  },
};

export default studentResolvers;
