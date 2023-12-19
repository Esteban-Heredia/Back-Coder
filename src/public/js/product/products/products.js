async function eliminarProducto(productoId) {
    try {
        const response = await fetch(`http://localhost:8080/products/${productoId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });

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
