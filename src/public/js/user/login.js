async function registrarUsuario() {
  const first_name = document.getElementById("first_name").value;
  const last_name = document.getElementById("last_name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const response = await fetch("http://localhost:8080/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ first_name, last_name, email, password }),
    });

    const result = await response.json();
    if (result.status === "success") {
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
    const password = document.getElementById("password").value;

    try {
        const response = await fetch("http://localhost:8080/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();
        console.log(data)
        console.log(response)
        if (response.ok) {
            alert("Inicio de sesión exitoso");
        } else {
            alert(`Inicio de sesión fallido: ${data.error}`);
        }
    } catch (error) {
        console.error("Error durante el inicio de sesión:", error);
    }
}