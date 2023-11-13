import mongoose from "mongoose";

const mensajes = "messages";

const mensajesSchema = new mongoose.Schema({
  user: {
    // type: String,
    type: mongoose.Schema.Types.ObjectId,
    ref: "usuarios",
    required: true,
  },
  mensajes: {
    type: String,
    required: true,
  },
  timestamp: { type: Date, default: Date.now },
});

export const massagesModel = mongoose.model(mensajes, mensajesSchema);
