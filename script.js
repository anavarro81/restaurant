
const validEmails = [
  "Antonio@gmail.com",
  "Matias@gmail.com",
  "Michelle@gmail.com",
  "Itziar@gmail.com",
  "Davinia@gmail.com"
];

const validPasswords = [
  "12345b",
  "12345b",
  "12345b",
  "12345b",
  "12345b"
];

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

const getData = () => {
  console.log("Ruta actual = ", window.location.href);

  if (window.location.href.indexOf("login.html") > 0) {
    console.log("Estoy en login");
  } else if (window.location.href.indexOf("booking.html") > 0) {
    console.log("Estoy en booking");
    const params = new URLSearchParams(window.location.search);
    const user = params.get("user");
    console.log(`Hola ${user}`);
  }
};

window.onload = getData;