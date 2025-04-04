"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const apollo_server_express_1 = require("apollo-server-express");
dotenv_1.default.config();
const schema_1 = __importDefault(require("./src/graphql/schema"));
const teacherResolvers_1 = __importDefault(require("./src/resolvers/teacherResolvers"));
const studentResolvers_1 = __importDefault(require("./src/resolvers/studentResolvers"));
const bookResolvers_1 = __importDefault(require("./src/resolvers/bookResolvers"));
const teacherRoutes_1 = __importDefault(require("./src/routes/teacherRoutes"));
const studentRoutes_1 = __importDefault(require("./src/routes/studentRoutes"));
const bookRoutes_1 = __importDefault(require("./src/routes/bookRoutes"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// Connect to MongoDB
if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI is not defined in environment variables');
}
mongoose_1.default.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to Database successfully!'))
    .catch((err) => console.error('Database connection failed:', err));
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// REST API Routes
app.use("/api/v1/teachers", teacherRoutes_1.default);
app.use("/api/v1/students", studentRoutes_1.default);
app.use("/api/v1/books", bookRoutes_1.default);
// GraphQL Setup
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        const server = new apollo_server_express_1.ApolloServer({
            typeDefs: schema_1.default,
            resolvers: [teacherResolvers_1.default, studentResolvers_1.default, bookResolvers_1.default],
        });
        yield server.start();
        server.applyMiddleware({ app: app });
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
            console.log(`GraphQL Server ready at http://localhost:${PORT}${server.graphqlPath}`);
        });
    });
}
startServer();
