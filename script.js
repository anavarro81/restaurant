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

const addToCart = (btn) => {
  // A partir del boton pulsado, recuperamos el nodo padre (div del plato)

  const dish = btn.parentNode;

  // Obtenemos la información del plato
  let dishImg = dish.getElementsByTagName("img");
  let paragraphs = dish.getElementsByTagName("p");
  let dishName = paragraphs[0];
  let dishPrice = paragraphs[2];

  const newDish = {
    name: dishName.innerText,
    price: dishPrice.innerText,
    image: dishImg[0].src,
    quantity: 1,
  };

  if (localStorage.getItem("cart")) {
    const cart = JSON.parse(localStorage.getItem("cart"));
    let searchedDish = cart.find((item) => item.name == dishName.innerText);

    if (searchedDish) {
      searchedDish.quantity++;
    } else {
      cart.push(newDish);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
  } else {
    // Si no existe el carrito crea el array y lo agrego.
    const dishes = [];
    dishes.push(newDish);
    localStorage.setItem("cart", JSON.stringify(dishes));
  }

  loadItems();
};

const calculateInitialTotals = () => {
  let totalOrder = 0;
  const summary = document.querySelector(".summary-value");
  const itemTotalPrices = document.querySelectorAll(".item-total-price");
  const totalAmountEl = document.querySelector(".total-amount");

  for (let index = 0; index < itemTotalPrices.length; index++) {
    totalOrder = totalOrder + parseFloat(itemTotalPrices[index].innerText);
  }

  summary.innerText = `${totalOrder} €`;
  totalAmountEl.innerText = `${(totalOrder * 1.1).toFixed(2)} €`;

  // Porcentaje de IVA
  const taxValue = document.querySelector(".tax-value");
  taxValue.innerText = totalOrder / 10;

  // Calcula total articulos badget
  updateBudget();
};

// Carga las opciones del select y selecciona la cantidad de cada plato.
const loadQuantityOpcs = (quantity) => {
  let quantityHTML = "";

  for (let index = 0; index < 10; index++) {
    quantityHTML =
      quantityHTML +
      `<option value="${index + 1}" ${index + 1 == quantity ? "selected" : ""}>${index + 1}</option>`;
  }

  return quantityHTML;
};

// Carga los articulos del arrito de la compra
const loadItems = () => {
  let mainDiv = document.querySelector(".cart-items");

  // Limpiamos el carrito para volver a generar de cero.
  mainDiv.innerHTML = "";

  if (localStorage.getItem("cart")) {
    const items = JSON.parse(localStorage.getItem("cart"));

    for (let index = 0; index < items.length; index++) {
      let itemTemplate = `<article class="cart-item">
        <div class="item-image-container">
          <img src="${items[index].image}" alt="Plato de comida" class="item-image" />
        </div>

        <div class="item-details">
          <h2 class="item-name">${items[index].name}</h2>
          <p> <span class="price-per-unit">${items[index].price} €<span> </span></span></p>
        </div>

        <div class="item-actions">
          <select name="quantity" class="item-quantity-select" onchange="updateTotal(this)">
            
            ${loadQuantityOpcs(items[index].quantity)}

          </select>
        </div>

        <div class="item-total-price-container">
          <span class="item-total-price">${items[index].quantity * parseFloat(items[index].price)}</span>
          <button type="button" onclick="deleteItem(this)" class="btn-remove">Borrar</button>
        </div>
      </article>`;

      mainDiv.innerHTML = mainDiv.innerHTML + itemTemplate;
    }
  } else {
    mainDiv.innerHTML = "<p> <b> El carrito está vacio <b> </p>";
  }
  calculateInitialTotals();
};

const deleteItem = (btn) => {
  // Seleccion el primer ancestro que coincida con el selector hacia arriba.
  const cartItem = btn.closest(".cart-item");

  let dishName = cartItem.querySelector(".item-name");

  // Obtiene el carrito de localstorage y lo filtra para quitar el elemento eliminado.
  const cart = JSON.parse(localStorage.getItem("cart"));

  const result = cart.filter((cartItem) => cartItem.name != dishName.innerText);

  // Si es el último plato que quedaba, borro localstorage.
  if (result.length == 0) {
    localStorage.removeItem("cart");
  } else {
    localStorage.setItem("cart", JSON.stringify(result));
  }

  // Elimina el elemento del DOM
  cartItem.remove();

  loadItems();
};

const updateTotal = (item) => {
  let totalOrder = 0;
  const IVA = 1.1;

  // Selecciona el articulo padre
  const article = item.parentNode.parentNode;

  // Selecciono los elementos para leer y escribir
  const totalPriceRaw = article.querySelector(".item-total-price");
  const pricePerUnitRaw = article.querySelector(".price-per-unit");
  const summary = document.querySelector(".summary-value");
  const totalAmount = document.querySelector(".total-amount");
  const taxValue = document.querySelector(".tax-value");

  const quantity = item.value;
  const pricePerUnit = parseFloat(pricePerUnitRaw.innerText);

  totalPriceRaw.innerHTML = quantity * pricePerUnit;

  const itemTotalPrices = document.querySelectorAll(".item-total-price");

  for (let index = 0; index < itemTotalPrices.length; index++) {
    totalOrder = totalOrder + parseFloat(itemTotalPrices[index].innerText);
  }

  summary.innerText = totalOrder;
  taxValue.innerText = totalOrder / 10;

  // redonda a a dos decimales
  totalAmount.innerHTML = (totalOrder * 1.1).toFixed(2);

  // Actaualizo localstorage con la nueva cantidad

  let dishName = article.querySelector(".item-name");

  let cart = JSON.parse(localStorage.getItem("cart"));

  let existing = cart.find((cartItem) => cartItem.name === dishName.innerText);

  updateBudget();

  if (existing) {
    existing.quantity = quantity;
    localStorage.setItem("cart", JSON.stringify(cart));
  }
};

//  Calcula el total articulos badget
const updateBudget = () => {
  // 1. Selecciona todos los select de cantidades de platos.
  const quantityEl = document.querySelectorAll(".item-quantity-select");

  let totalItems = 0;

  // 2. Suma todos los valores (cantidades actuales de cada producto)
  for (let index = 0; index < quantityEl.length; index++) {
    totalItems = totalItems + parseInt(quantityEl[index].value);
  }
  // 3. Actualiza el valor del badget.
  const cartBadgetEl = document.querySelector(".cart-badge");
  cartBadgetEl.innerText = totalItems;
};

// Muestra / Oculta el carrito al pulsar en el icono.
const toggleCart = () => {
  const cartEl = document.querySelector(".shopping-cart");

  if (cartEl.style.visibility == "hidden" || cartEl.style.visibility == "") {
    cartEl.style.visibility = "visible";
    loadItems();
  } else {
    cartEl.style.visibility = "hidden";
  }
};

window.onload = getData;
