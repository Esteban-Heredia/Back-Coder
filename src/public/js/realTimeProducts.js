// En realTimeProducts.js
const socket = io();

// Inicializa la variable products como un arreglo vacío
let products = [];

// Escuchar el evento 'productosActualizados' desde el servidor
socket.on('productosActualizados', (data) => {
  products = data.products; // Actualiza la variable products con los datos recibidos

  // Lógica para renderizar los datos en la página
  const ul = document.querySelector('ul');
  ul.innerHTML = ''; // Limpia la lista existente

  // Verifica si products es un arreglo antes de usar forEach
  if (Array.isArray(products)) {
    // Renderiza los productos actualizados en la lista
    products.forEach((product) => {
      const li = document.createElement('li');
      li.textContent = `${product.title} - Precio: $${product.price}`;
      ul.appendChild(li);
    });
  } else {
    console.error('La variable products no es un arreglo válido.');
  }
});

// Emitir un evento para solicitar datos iniciales (opcional)
socket.emit('solicitarDatosIniciales');
