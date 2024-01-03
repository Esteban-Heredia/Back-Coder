function hasJwtToken() {
    var allCookies = document.cookie;
    var jwtTokenName = 'jwt'; // Reemplaza con el nombre real de tu cookie JWT
  
    // Busca el nombre de la cookie JWT en la cadena de cookies
    var jwtTokenIndex = allCookies.indexOf(jwtTokenName + '=');
  
    // Si el índice es mayor o igual a 0, significa que la cookie JWT está presente
    return jwtTokenIndex >= 0;
  }
  
  // Llamada a la función y muestra el resultado en la consola
  var hasToken = hasJwtToken();
  console.log('¿Tiene JWT token?:', hasToken);
  
// // Tu token
// const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTg4NDYyZTcxZjJiMmQ5MDRjZDE3ZjciLCJlbWFpbCI6ImFzZEBhc2QuY29tIiwiaWF0IjoxNzAzODkwODE5LCJleHAiOjE3MDM4OTQ0MTl9.zgEIHvjEFuyH8TvvF_Mh_XgRFREDSrGSwm0OpTV7SSA';

// // Almacena el token en localStorage
// localStorage.setItem('jwtToken', token);

// // Obtiene el token del localStorage
// const storedToken = localStorage.getItem('jwtToken');

// // Decodifica el token (si es necesario)
// const decodedToken = storedToken ? JSON.parse(atob(storedToken.split('.')[1])) : null;
// console.log(decodedToken);
