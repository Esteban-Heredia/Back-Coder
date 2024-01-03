async function crearProducto() {
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const price = document.getElementById("price").value;
  const thumbnail = document.getElementById("thumbnail").value;
  const code = document.getElementById("code").value;
  const stock = document.getElementById("stock").value;

  const _id = document.getElementById("_id")
    ? document.getElementById("_id").value
    : null;

  try {
    const url = _id
      ? `http://localhost:8080/products/${_id}`
      : "http://localhost:8080/products";
    const method = _id ? "PUT" : "POST";

    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
      }),
    });

    const result = await response.json();
    if (result.status === "se creo el producto") {
      alert("Producto creado con éxito");
    } else {
      alert("Error al crear/editar el producto");
    }
    window.location.href = "/products";
  } catch (error) {
    console.error("Error en la solicitud:", error);
  }
}
