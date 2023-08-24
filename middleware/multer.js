import multer from "multer"
import path from "path"
import { fileURLToPath } from "url"
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)


const storage = multer.diskStorage({
    destination: (req,file,cb) =>{
        cb(null,"images/profile/")
    },
    filename:(req,file,cb)=>{
        cb(null,Date.parse(new Date())+"_"+file.originalname)
    }
})
const uploads = multer({storage:storage})



export default uploads

    