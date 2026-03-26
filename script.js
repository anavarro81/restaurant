const validEmails = [
  "Antonio@gmail.com",
  "Matias@gmail.com",
  "Michelle@gmail.com",
  "Itziar@gmail.com",
  "Davinia@gmail.com",
];

const validPasswords = ["12345b", "12345b", "12345b", "12345b", "12345b"];

const login = () => {
  const email$$ = document.querySelector("#email");
  const pas$$ = document.querySelector("#password");
  const error$$ = document.querySelector("#error-msg");

  const inputEmail = email$$.value;
  const inputPass = pas$$.value;

  let credencialesCorrectas = false;

  for (let i = 0; i < validEmails.length; i++) {
    if (validEmails[i] === inputEmail && validPasswords[i] === inputPass) {
      credencialesCorrectas = true;
      window.location.href = `/index-formulario.html?user=${inputEmail}`;
      break;
    }
  }

  if (!credencialesCorrectas) {
    console.log("credenciales incorrectas");
    error$$.innerText = "credenciales incorrectas";
  }
};

const confirmaciónReserva = () => {
  console.log("Estoy en confirmación de reserva");

  // Obtengo los datos del formulario
  const params = new URLSearchParams(window.location.search);
  const usuario = params.get("usuario");
  const fecha = params.get("fecha");
  const email = params.get("email");
  const hora = params.get("hora");

  // Convierte fecha de formato DD-MM-AAAA
  let localeDate = new Date(fecha);
  localeDate.toLocaleDateString(); 

  
  // Rellena los datos de la confirmacion a partir de los 
  const nameElement = (document.querySelector("#name").innerHTML = usuario);
  const emailElement = (document.querySelector("#email").innerText = email);
  const dateElement = (document.querySelector("#date").innerText = fecha);
  const timeElement = (document.querySelector("#time").innerText = hora);
};

const getData = () => {
  console.log("Ruta actual = ", window.location.href);

  if (window.location.href.indexOf("confirmation.html") > 0) {
    confirmaciónReserva();
  }
};

window.onload = getData;
