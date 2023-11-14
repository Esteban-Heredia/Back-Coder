import { guardarMensaje } from './socketCliente.js'

export const mandarMensaje = (e) => {
  e.preventDefault();

  const user = document.querySelector("#user").value;
  const mensaje = document.querySelector("#message").value;

  guardarMensaje(user, mensaje)
};

export const renderizarChat = (data) => {
  const chatList = document.getElementById('chat-list');

  chatList.innerHTML = '';

  data.forEach((chat) => {
      const li = document.createElement('li');
      li.innerHTML = `
          <p>User:</p> ${chat.user}
          <br>
          <p>Message:</p> ${chat.mensajes}
          <br>
          <p>Hora:</p> ${chat.timestamp}
      `;
      chatList.appendChild(li);
  });
}