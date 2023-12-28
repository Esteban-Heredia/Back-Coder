// Obtén el token JWT almacenado en la cookie
const jwtToken = document.cookie.split('; ').find(row => row.startsWith('jwt='))?.split('=')[1];

if (jwtToken) {
  // Accede directamente a la información del usuario sin decodificar el token
  const userInfo = JSON.parse(atob(jwtToken.split('.')[1]));

  console.log('Información del usuario:', userInfo);
} else {
  // Manejar el caso en el que no se encuentre el token en la cookie

  console.log('no hay cookie padre...')
}
