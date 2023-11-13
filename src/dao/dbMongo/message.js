import { Router } from "express";
import { massagesModel } from '../models/messages.js';

const router = Router();

router.post('/', async (req, res) => {
    try {
        const { user, mensajes } = req.body;
        if (!user || !mensajes) {
            return res.status(400).send({ status: 'Datos incompletos, error al enviar el mensaje' });
        }

        const nuevoMensaje = await massagesModel.create({
            user,
            mensajes
        });

        res.send({ status: 'Se envió el mensaje correctamente' });
    } catch (error) {
        console.error('Error al enviar el mensaje', error);
        res.status(500).send({ error: 'Error en el servidor no llega el' });
    }
});

router.get('/', async (req, res) => {
    try {
        const chats = await massagesModel.find().lean();
        res.render('chat', {chats});
    } catch (error) {
        console.error('Error al obtener los mensajes', error);
        res.status(500).send({ error: 'Error en el servidor' });
    }
});

export default router;
