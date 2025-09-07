import express from 'express';
import upload from './upload.js'

export default function (prisma) {
    const router = express.Router();

    // Create

    router.post('/create',upload.single('photo'), async (req, res) => {
        const { firstName, lastName, email, embedding } = req.body
        const photoUrl = req.file ? `/uploads/${req.file.filename}` : null
        try {
            const employee = await prisma.employee.create({
                data: {firstName,lastName,email, embedding:typeof embedding === "String" ? JSON.parse(embedding): embedding,profilePic:photoUrl}
            });
            res.json({success: true, message: "Employee Succcesfully created",employee});
        } catch (err) {
            res.status(500).json({success: false, error: err.message})
        }
    });

    // Read all

    router.get('/', async (req, res) => {
        const employees = await prisma.employee.findMany({ include: {attendances: true}});
        res.json(employees);
    });

    // Read One
    router.get('/:id', async (req, res) => {
        const { id } = req.params;
        const employee = await prisma.employee.findUnique({
            where: { id: Number(id)},
            include: { attendances: true }
        });
        res.json(employee);
    })

    // Update

    router.put('/:id', async (req, res) => {
        const { id } = req.params;
        const updated = await prisma.employee.update({
            where: { id: Number(id)},
            data: req.body
        });
        res.json(updated);
    })

    //  Delete
    router.delete('/:id', async (req, res) => {
        const { id } = req.params;
        await prisma.employee.delete({
            where: {id: Number(id)}
        });
        res.json({message: 'Employee deleted successfully'})
    });

    return router;
}