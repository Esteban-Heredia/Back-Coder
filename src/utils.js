import {fileURLToPath} from 'url'
import { dirname  } from 'path'
import multer from 'multer';
import bcrypt from 'bcrypt'
import  jwt  from 'jsonwebtoken';


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

const PRIVATE_KEY = 'LlaveSecret'

export const generarToke = (user) =>{
    const token = jwt.sign({user},PRIVATE_KEY,{expiresIn: '24h'})
    return token;
}

export const authToken = (req,res,next)=>{
    const authHeader = req.headers.autorization;
    if(!authHeader){
        return res.status(401).send({error: "no esta autenticado"})
    }
    const token = authHeader.split('')[1];
    jwt.verify(token, PRIVATE_KEY,(error,credentials)=>{
        if(error) return res.status(403).send({error:"no autorizado"})

        req.user = credentials.user;
        next();
    })
}

export const createHash = password => bcrypt.hashSync(password,bcrypt.genSaltSync(10))

export const isValidPassword = (user,password) => bcrypt.compareSync(password, user.password)

export const uploader = multer({storage})
export default __dirname;
