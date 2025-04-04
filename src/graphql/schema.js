"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const typeDefs = (0, apollo_server_express_1.gql) `
  type Teacher {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    subject: String!
    students: [Student]
  }

  type Student {
    id: ID!
    firstName: String!
    lastName: String!
    age: Int!
    teachers: [Teacher]
    books: [Book]
  }

  type Book {
    id: ID!
    title: String!
    author: String!
    subject: String
    isbn: String!
    student: Student
  }

  type Query {
    teachers: [Teacher]
    students: [Student]
    books: [Book]
    teacher(id: ID!): Teacher
    student(id: ID!): Student
    book(id: ID!): Book
  }

  type Mutation {
    addTeacher(firstName: String!, lastName: String!, email: String!, password: String!, subject: String!): Teacher
    addStudent(firstName: String!, lastName: String!, age: Int!, teacherId: ID!): Student
    addBook(title: String!, author: String!, subject: String, isbn: String!, studentId: ID): Book
    updateTeacher(id: ID!, firstName: String, lastName: String, email: String, subject: String): Teacher
    updateStudent(id: ID!, firstName: String, lastName: String, age: Int): Student
    updateBook(id: ID!, title: String, author: String, subject: String, isbn: String): Book
    deleteTeacher(id: ID!): Boolean
    deleteStudent(id: ID!): Boolean
    deleteBook(id: ID!): Boolean
    addStudentToTeacher(studentId: ID!, teacherId: ID!): Student

  }
`;
exports.default = typeDefs;
