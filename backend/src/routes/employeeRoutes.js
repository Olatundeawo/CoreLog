import express from 'express';

export default function (prisma) {
    const router = express.Router();

    // Create

    router.post('/', async (req, res) => {
        try {
            const employee = await prisma.employee.create({
                data: req.body
            });
            res.json(employee);
        } catch (err) {
            res.status(500).json({error: err.message})
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