import express from "express";
import crypto from 'crypto';

export default function(prisma) {
    const router = express.Router();

    router.post('/generate', async (req, res) => {
        try {
          const rawCode = crypto.randomBytes(6).toString('hex').toUpperCase();
          const code = rawCode.match(/.{1,4}/g).join("-");
      
          const newCode = await prisma.LicenseCode.create({ data: { code } });
         
      
          res.json({ success: true, message: "License generated", code: newCode.code });
        } catch (err) {
          res.status(500).json({ success: false, error: err.message });
        }
      });
      
      router.post('/activate', async (req, res) => {
        const { code, machineId } = req.body;
        try {
          const license = await prisma.LicenseCode.findUnique({ where: { code } });
      
          if (!license) {
            return res.status(400).json({ success: false, error: "Invalid code" });
          }
          if (license.used) {
            return res.status(400).json({ success: false, error: "Code already used" });
          }
      
          await prisma.LicenseCode.update({
            where: { code },
            data: { used: true, usedBy: machineId || null },
          });
      
          res.json({ success: true, message: "Activation successful" });
        } catch (err) {
          res.status(500).json({ success: false, error: err.message });
        }
      });
      
    return router;
}