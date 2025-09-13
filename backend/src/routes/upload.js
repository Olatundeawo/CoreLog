import multer from "multer";
import path from "path";
import fs from "fs";


const uploadDir = path.join(process.cwd(), "uploads");

// Create uploads folder if it doesn't exist
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    }, 
    filename: (req, file, cb) => {
        cb(null, Date.now()+ '-'+ file.originalname)
    }
})

const upload = multer({ storage: storage})

export default upload