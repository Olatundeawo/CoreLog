import express from 'express';
import { PrismaClient } from '../generated/prisma';

import employeeRoutes from './routes/employeeRoutes';
import adminRoutes from './routes/adminRoutes';
import attendanceRoutes from './routes/attendanceRoutes';

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

app.use('/employess', employeeRoutes(prisma))
app.use('/attendances', attendanceRoutes(prisma))
app.use('/admins', adminRoutes(prisma))

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});