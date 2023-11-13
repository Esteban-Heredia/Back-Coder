import { getChats, postChats } from "./chatSocket/chatSocket.js";

export default (serverSocket) => {
  serverSocket.on("connection", (socket) => {
    console.log("Nuevo cliente conectado");

    getChats(socket);

    socket.on("guardarMensaje", (data) => {
      postChats(data);

      socket.emit('actualizarChats', getChats(socket))
    });
  });
};
