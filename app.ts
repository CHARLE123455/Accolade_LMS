
import express from 'express';

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';

dotenv.config();

import typeDefs from "./src/graphql/schema";
import teacherResolvers from "./src/resolvers/teacherResolvers";
import studentResolvers from "./src/resolvers/studentResolvers";
import bookResolvers from "./src/resolvers/bookResolvers";
import teacherRoutes from "./src/routes/teacherRoutes";
import studentRoutes from "./src/routes/studentRoutes";
import bookRoutes from "./src/routes/bookRoutes";

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI is not defined in environment variables');
}
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to Database successfully!'))
    .catch((err) => console.error('Database connection failed:', err));

// Middleware
app.use(cors());
app.use(express.json());

// REST API Routes
app.use("/api/v1/teachers", teacherRoutes);
app.use("/api/v1/students", studentRoutes);
app.use("/api/v1/books", bookRoutes);

// GraphQL Setup
async function startServer() {
    const server = new ApolloServer({
        typeDefs,
        resolvers: [teacherResolvers, studentResolvers, bookResolvers],
    });

    await server.start();
    server.applyMiddleware({ app: app as any });
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
        console.log(`GraphQL Server ready at http://localhost:${PORT}${server.graphqlPath}`);
    });
}

startServer();
