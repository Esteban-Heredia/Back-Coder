const userData = JSON.parse(localStorage.getItem('user'))?.payload.user;

const DataUserContainer = document.getElementById("DataContainer")

if (userData) {
  DataUserContainer.innerHTML = `Hola ${userData} `;
} else {
  DataUserContainer.innerHTML = `Usted debe loguearse`;
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
