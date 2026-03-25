const email$$ = document.querySelector("#email");
const pas$$ = document.querySelector("#password");
const error$$ = document.querySelector("#error-msg");

const validUsers = [
  {
    email: "Antonio@gmail.com",
    password: "12345b",
  },

  {
    email: "Matias@gmail.com",
    password: "12345b",
  },

  {
    email: "Michelle@gmail.com",
    password: "12345b",
  },

  {
    email: "Itziar@gmail.com",
    password: "12345b",
  },

  {
    email: "Davinia@gmail.com",
    password: "12345b",
  },
];


const login = () => {
  console.log("email", email$$.value);
  console.log("pass", pas$$.value);

  for (const user in validUsers) {
    const element = validUsers[user];

    if (element.email == email$$.value && element.password == pas$$.value) {
      window.location.href = "/booking.html";
    } else {
      console.log("credenciales incorrectas");
      error$$.innerText = "credenciales incorrectas";
    }
  }
};
