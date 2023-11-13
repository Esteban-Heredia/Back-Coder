import { guardarMensaje } from './socketCliente.js'

export const mandarMensaje = (e) => {
  e.preventDefault();

  const user = document.querySelector("#user").value;
  const mensaje = document.querySelector("#message").value;

  guardarMensaje(user, mensaje)
};