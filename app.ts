import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';

dotenv.config();
import connectDB from "./src/config/db";
import typeDefs from "./src/graphql/schema";
import teacherResolvers from "./src/resolvers/teacherResolvers";
import studentResolvers from "./src/resolvers/studentResolvers";
import bookResolvers from "./src/resolvers/bookResolvers";
import teacherRoutes from "./src/routes/teacherRoutes";
import studentRoutes from "./src/routes/studentRoutes";
import bookRoutes from "./src/routes/bookRoutes";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI is not defined in environment variables');
}
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to Database successfully !!!'))


app.use(cors());

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Express
app.use(express.json());
app.use(cors());

// REST API Routes
app.use("/teachers", teacherRoutes);
app.use("/students", studentRoutes);
app.use("/books", bookRoutes);

// GraphQL Setup
const server = new ApolloServer({
  typeDefs,
  resolvers: [teacherResolvers, studentResolvers, bookResolvers],
});

async function startServer() {
  server.applyMiddleware({ app: app as express.Application });
  server.applyMiddleware({ app });

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`GraphQL Playground available at http://localhost:${PORT}/graphql`);
  });
}

startServer();
