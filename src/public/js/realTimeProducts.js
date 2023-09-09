const socket = io();

const input = document.getElementById('textbox');
const log = document.getElementById('log');

input.addEventListener('keyup', evt=>{
   if (evt.key === "Enter"){
    socket.emit('mensaje', input.value);
    input.value ="";
   }
})

socket.on ('log', data=>{
    let mensajes = "";
    data.logs.forEach(log => {
        mensajes += `${log.socketId} dice: ${log.mensaje} <br/>`
    });
    log.innerHTML = mensajes
})