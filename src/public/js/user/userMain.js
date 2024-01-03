async function crearUser() {
  const first_name = document.getElementById("first_name").value;
  const last_name = document.getElementById("last_name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const role = document.getElementById("role")?.value;

  const _id = document.getElementById("_id")
    ? document.getElementById("_id").value
    : null;

  try {
    const url = _id
      ? `http://localhost:8080/users/${_id}`
      : "http://localhost:8080/users";

      const method = _id ? "PUT" : "POST";

      const response = await fetch(url,{
        method,
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            first_name,
            last_name,
            email,
            password,
        }),
      });
      const result = await response.json();
      if(result.status === "se creo el usuario") {
        alert("usuario creado con exito");
      } else{ 
        alert("Error al crear/editar el usario")
      }
      window.location.href = "/users"
  } catch (error) {
    console.error("error en la solicitud de usuario", error);
  }
}

async function eliminarUser(userId) {
  try {
    const response = await fetch(`http://localhost:8080/users/${userId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();
    console.log(result, "result user");

    if (result.status === "se borro correctamente") {
      alert("usuario eliminado con éxito");

      window.location.reload();
    } else {
      alert("Error al eliminar el usuario");
    }
  } catch (error) {
    console.error("Error en la solicitud:", error);
  }
}

async function editarUser(userId) {
  window.location.href = `/newuser/${userId}`;
}
