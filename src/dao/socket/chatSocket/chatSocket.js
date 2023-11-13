import { massagesModel } from '../../models/messages.js';

export const getChats = async (socket) => {
  try {
    const chats = await massagesModel.find();
    socket.emit('conversacion', chats);
  } catch (error) {
    console.error('Error al obtener los chats:', error);
  }
};

export const postChats = async (data) => {
  const nuevoMensaje = new massagesModel({
    user: data.user,
    mensajes: data.mensaje,
  });

  nuevoMensaje.save()
};