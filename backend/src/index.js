import express from 'express';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import cors from "cors"
import employeeRoutes from './routes/employeeRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import attendanceRoutes from './routes/attendanceRoutes.js';
import licenseRoutes from './routes/licenseRoutes.js';


dotenv.config();

const app = express();
app.use(express.json());

const prisma = new PrismaClient();


app.use('/uploads', express.static('uploads'));


app.use(cors());

app.use('/license',licenseRoutes(prisma))

app.use('/employees', employeeRoutes(prisma));
app.use('/attendances', attendanceRoutes(prisma));
app.use('/admins', adminRoutes(prisma));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
