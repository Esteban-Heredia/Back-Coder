import { cargarChat } from "./socketCliente.js";
import { mandarMensaje } from "./chat.js";

cargarChat();

const messageForm = document.querySelector("#message-form");

messageForm.addEventListener("submit", mandarMensaje,);