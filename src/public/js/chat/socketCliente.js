const socketClient = io()

export const cargarChat = () =>{
    socketClient.on('conversacion', (data)=>{
        console.log(data)
    })
}

export const guardarMensaje = (user, mensaje)=>{
    socketClient.emit('guardarMensaje',{
        user,
        mensaje
    })
}

export const chatsActualizados = () =>{
    socketClient.on('actualizarChats', (data) =>{
        console.log(data, 'Chat actualizados')
    })
}