const cartId = JSON.parse(localStorage.getItem("user"))?.payload.cart;
const productRole = JSON.parse(localStorage.getItem("user"))?.payload.role;

if (productRole === "user") {
  const editDeleteElements = document.querySelectorAll(".edit-delete-products");
  editDeleteElements.forEach((element) => {
    element.style.display = "none";
  });
}

const finalizarCompra = () =>{
    window.location.href = `http://localhost:8080/carts/${cartId}`
}

async function agregarProducto(productoId) {
  try {
    const response = await fetch(
      `http://localhost:8080/carts/${cartId}/products/${productoId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    alert("se agrego correctamente al carrito!!");
  } catch (error) {
    console.error("Error en la solicitud:", error);
  }
}

async function eliminarProducto(productoId) {
  try {
    const response = await fetch(
      `http://localhost:8080/products/${productoId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const result = await response.json();
    if (result.message === "Producto eliminado correctamente") {
      alert("Producto eliminado con éxito");

      window.location.reload();
    } else {
      alert("Error al eliminar el producto");
    }
  } catch (error) {
    console.error("Error en la solicitud:", error);
  }
}

async function editarProducto(productoId) {
  window.location.href = `/newproduct/${productoId}`;
}
