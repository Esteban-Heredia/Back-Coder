const cartId = JSON.parse(localStorage.getItem("user"))?.payload.cart;

async function eliminarDelCarrito(productoId) {
  try {
    const response = await fetch(
      `http://localhost:8080/carts/${cartId}/products/${productoId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    alert("se elimino del carrito!!");

    window.location.reload();
  } catch (error) {
    console.error("Error en la solicitud:", error);
  }
}

console.log("holaaaa");
