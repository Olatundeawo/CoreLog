import express from 'express'

export default function (prisma) {
    const router = express.Router();

    // Create

    router.post('/', async (req, res) => {
        try {
            const attendance = await prisma.attendance.create({
                data: req.body
            });
            res.json(attendance)
        } catch (err) {
            res.status(500).json({error: err.message})
        }
    });

    // Read all

    router.get('/', async(res, req) => {
        const attendances = await prisma.attendance.findMany({
            include: { employee: true}
        });
        res.json(attendances)
    })

    // Read one
    router.get('/:id', async (req, res) => {
        const { id } = req.params;
        const record = await prisma.attendance.findUnique({
            where: {id: Number(id)},
            include: { employee: true}
        });
        res.json(record);
    });

    // Update
    router.put('/:id', async (req, res) => {
        const { id } = req.params;
        const update = await prisma.attendance.update({
            where: {id: Number(id)},
            data: req.body
        });
        res.json(update)
    });

    // Delete
    router.delete('/:id', async(req, res) => {
        const { id } = req.params;
        await prisma.attendance.delete({
            where: {
                id: Number(id)
            }
        });
        res.json({ message: 'Attendance deleted'})
    })

    return router;

}