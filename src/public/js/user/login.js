async function registrarUsuario() {
  const nombre = document.getElementById("nombre").value;
  const apellido = document.getElementById("apellido").value;
  const email = document.getElementById("email").value;
  const contrasena = document.getElementById("contrasena").value;

  try {
    const response = await fetch("http://localhost:8080/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nombre, apellido, email, contrasena }),
    });

    const result = await response.json();
    if (result.status === "El usuario se creo correctamente") {
      alert("Usuario creado con éxito");
    } else {
      alert("Error al crear el usuario");
    }
  } catch (error) {
    console.error("Error en la solicitud:", error);
  }
}


async function login() {
    const email = document.getElementById("email").value;
    const contrasena = document.getElementById("contrasena").value;

    try {
        const response = await fetch("http://localhost:8080/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, contrasena }),
        });

        const data = await response.json();

        if (response.ok) {
            alert("Inicio de sesión exitoso");
        } else {
            alert(`Inicio de sesión fallido: ${data.error}`);
        }
    } catch (error) {
        console.error("Error durante el inicio de sesión:", error);
    }
}