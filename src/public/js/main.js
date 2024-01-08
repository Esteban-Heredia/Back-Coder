const userData = JSON.parse(localStorage.getItem('user'))?.payload.user;
const userRole = JSON.parse(localStorage.getItem("user"))?.payload.role;
const cartId = JSON.parse(localStorage.getItem("user"))?.payload.cart;

const llevarAlCarrito = () => {
  if (cartId) {
    window.location.href = `http://localhost:8080/carts/${cartId}`;
  } else {
    console.error("No se pudo encontrar el ID del carrito.");
  }
}

document.addEventListener('DOMContentLoaded', function () {
  const carritoBtn = document.getElementById('carritoBtn');

  if (carritoBtn) {
    carritoBtn.addEventListener('click', llevarAlCarrito);
  }
});

const DataUserContainer = document.getElementById("DataContainer")

if(userRole === "user"){
  const viewAdmin = document.getElementById("viewAmd")
  viewAdmin.style.display = "none"  
}

if (userData) {
  DataUserContainer.innerHTML = `Hola ${userData} `;
  let loginLink = document.getElementById("loginLink")
  loginLink.style.display = "none"
} else {
  DataUserContainer.innerHTML = `Usted debe loguearse`;
  let logout = document.getElementById("logoutBtn")
  logout.style.display = "none"
}

document.addEventListener('DOMContentLoaded', function () {
  const logoutBtn = document.getElementById('logoutBtn');

  logoutBtn.addEventListener('click', function () {
    logout();
  });

  function logout() {
    document.cookie = "jwt=; max-age=0";
    localStorage.removeItem('jwt');
    localStorage.clear();
    alert("gracias vuelvas prontos!")
    window.location.href = '/';
  }
});
