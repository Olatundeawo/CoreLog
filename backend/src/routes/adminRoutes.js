import express from 'express';
import bcrypt from 'bcrypt';

export default function(prisma) {
    const router = express.Router()

    // Create admin
    router.post('/create', async (req, res) => {
        try {
            const { username, email, password, code } = req.body;
            
            if (!username || !email || !password || !code) {
                return res.status(400).json({success: false, error: "Field is required"})
            }
            const hashedPassword = await bcrypt.hash(password,10)
            const license = await prisma.licenseCode.findUnique({
                where: { code }
            })
            if (!license) {
                return res.status(400).json({success:false, error: "Invalid code"})
            }
            const admin = await prisma.admin.create({
                data: { username, email, password: hashedPassword}
            });
            res.json({success: true, message: "Admin successfully registered", admin});
        } catch (err) {
            console.error("❌ Backend error:", err);
            res.status(500).json({ success: false, error: err.message})
        }
    });


    // Read one
    router.get('/:id', async (req, res) => {
        const { id } = req.params;
        const admin = await prisma.admin.findUnique({
            where: {id: Number(id)}
        });
        res.json(admin)
    });

    // Read all
    router.get('/', async (req, res) => {
        const all = await prisma.admin.findMany();
        if (all.length === 0) {
            return res.status(404).json({message: "No admin added yet"})
        }
        
        res.json(all)
    });

    // Update
    router.put('/:id', async (req, res) => {
        const { id } = req.params;
        const { password, ...rest } = req.body;

        const updateData = { ...rest };
        if (password) {
            updateData.password = await bcrypt.hash(password, 10);
        }

        const update = await prisma.admin.update({
            where: {id: Number(id)},
            data: updateData
        });
        res.json(update)
    });

    // Delele

    router.delete('/:id', async (req, res) => {
        const { id } = req.params;
        await prisma.admin.delete({
            where: { id: Number(id)}
        });
        res.json({message: 'Admin deleted'})
    });

    return router;
}