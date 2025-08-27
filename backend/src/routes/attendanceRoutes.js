import e from 'express';
import express from 'express'

export default function (prisma) {
    const router = express.Router();

    // Check in
    router.post('/checkin', async (req, res) => {
        const { empolyeeId, checkInPic } = req.body

        try {
            const employee = await prisma.employee.findUnique({
                where: {id: empolyeeId}
            })
            if(!employee) {
                return res.status(400).json({message:"You are not on the payroll"})
            }

            const activeAttendance = await prisma.attendance.findFirst({
                where :{empolyeeId, checkOut: null}
            })

            if (activeAttendance) {
                return res.status(400).json({message: "You have already checkIn"})
            }

            const attendance = await prisma.attendance.create({
                data: {empolyeeId, checkIn: new Date(), checkInPic, verified: false}
            })
            res.json({message: "You have been checkIn ", attendance})
        } catch(err) {
            res.status(500).json({message: err.message})
        }
    });

    // Check out

    router.post('/checkout', async( req, res) => {
        const { empolyeeId, checkOutPic} = req.body

        try {
            const employee = await prisma.employee.findUnique({where: {id: empolyeeId}})
            if (!employee) {res.status(404).json({message: "You are not on pay rol"})}

            const activeAttendance = await prisma.attendance.findFirst({where: {empolyeeId, checkOut:null}})
            if(!activeAttendance) {
                res.status(404).json({message:"You have not checkIn"})
            }

            const updateAttendance = await prisma.attendance.update({
                where: {id: activeAttendance.id},
                data: {checkOut: new Date(), checkOutPic}
            })
            res.json({message: "checkout succesfully", attendance: updateAttendance})
        } catch(err) {
            res.status(500).json({message: err.message})
        }
    })

    return router;

}