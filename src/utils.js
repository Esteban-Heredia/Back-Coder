import {fileURLToPath} from 'url'
import { dirname  } from 'path'
import multer from 'multer';
import bcrypt from 'bcrypt'


const __fileName = fileURLToPath(import.meta.url);
const __dirname = dirname(__fileName);

const storage = multer.diskStorage({
    destination: function (req,file,cb){
        cb(null,`${__dirname}/public/img`)
    },
    filename: function (req,file,cb){
        cb(null,file.originalname)
    }
})

export const createHash = password => bcrypt.hashSync(password,bcrypt.genSaltSync(10))

export const isValidPassword = (user,contrasena) => bcrypt.compareSync(contrasena, user.contrasena)

export const uploader = multer({storage})
export default __dirname;
