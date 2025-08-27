import express from 'express';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import cors from "cors"
import employeeRoutes from './routes/employeeRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import attendanceRoutes from './routes/attendanceRoutes.js';

dotenv.config();

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

app.use(cors());

app.use('/employees', employeeRoutes(prisma));
app.use('/attendances', attendanceRoutes(prisma));
app.use('/admins', adminRoutes(prisma));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
