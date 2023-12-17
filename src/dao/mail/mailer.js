import { Router } from "express";
import nodemailer from 'nodemailer'
import __dirname from "../../utils.js";
const router = Router();

const transport = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: 'estebanhdg@gmail.com',
        pass: 'lbws llay uyba xpsx'
    }
})

router.get('/', async (req, res) => {
    console.log('arranca')
    const result = await transport.sendMail({
        from: 'Coder Test <estebanhdg@gmail.com>',
        to: 'myfortaapp@gmail.com',
        subject: 'correo de prueba',
        html: `
            <div>
                <h1>Esto es un test</h1>
            </div>`,
        attachments: [{
            filename:'gato.png',
            path: __dirname + '/public/img/gato.png',
            cid:'gato'
        }]
    })

    console.log('se mandooo')
    res.send(result);
})

export default router;
