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
  // http://127.0.0.1:5500//confirmation.html?usuario=Antonio&apellido=Navarro&email=a%40gmail.com&tel=623000000&personas=1&fecha=2026-03-25&hora=07%3A46&mensaje=
  const params = new URLSearchParams(window.location.search); // Contiene a partir de la ? => "?usuario=Antonio&apellido=..."
  const usuario = params.get("usuario");
  const emaill = params.get("email");
  const fecha = params.get("fecha");
  const hora = params.get("hora");

  let localeDate = new Date(fecha); 
  localeDate.toLocaleDateString(); // Convierte fecha de formato AAAA-MM-DD a 

  const reservaTemplate = `
------------------------------------------
     🥘 RESERVA: RESTAURANTE EL SOCARRAT 🥘
------------------------------------------
Estimado/a **${usuario ?? "Cliente"}**,

Confirmamos los detalles de su reserva:
📧 Email de contacto: ${emaill ?? "No registrado"}
📅 Fecha: ${localeDate.toLocaleDateString() ?? "Pendiente"}
🕒 Hora: ${hora ?? "Pendiente"}

¡Le esperamos para disfrutar del mejor arroz!
------------------------------------------
`;

  console.log(reservaTemplate);
};

const getData = () => {
  console.log("Ruta actual = ", window.location.href);

  if (window.location.href.indexOf("confirmation.html") > 0) {
    confirmaciónReserva();
  }
};

window.onload = getData;
