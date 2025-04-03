import {
  getAllTeachersService,
  getTeacherByIdService,
  createTeacherService,
  updateTeacherService,
  deleteTeacherService,
  getStudentsByTeacherService,
  addStudentToTeacherService,
} from "../services/teacherService";

const teacherResolvers = {
  Query: {
    teachers: async () => await getAllTeachersService(),
    teacher: async (_: any, { id }: { id: string }) => await getTeacherByIdService(id),
  },
  Mutation: {
    addTeacher: async (
      _: any,
      { firstName, lastName, email, password, subject }: 
      { firstName: string; lastName: string; email: string; password: string; subject: string }
    ) => {
      return await createTeacherService(firstName, lastName, email, password, subject);
    },
    updateTeacher: async (
      _: any,
      { id, updateData }: { id: string; updateData: any }
    ) => {
      return await updateTeacherService(id, updateData);
    },
    deleteTeacher: async (_: any, { id }: { id: string }) => {
      return await deleteTeacherService(id);
    },
    addStudentToTeacher: async (
      _: any,
      { teacherId, studentId }: { teacherId: string; studentId: string }
    ) => {
      return await addStudentToTeacherService(teacherId, studentId);
    },
  },
  Teacher: {
    students: async (parent: any) => await getStudentsByTeacherService(parent._id),
  },
};

export default teacherResolvers;
