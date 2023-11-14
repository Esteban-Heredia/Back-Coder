import { cargarChat } from "./socketCliente.js";
import { mandarMensaje, renderizarChat } from "./chat.js";

cargarChat(renderizarChat);

const messageForm = document.querySelector("#message-form");

messageForm.addEventListener("submit", mandarMensaje,);