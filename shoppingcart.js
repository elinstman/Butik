// shoppingCartModule.js (din befintliga kod)
const ShoppingCartModule = (function () {
  const cart = [];

  return {
    addToCart: function (product) {
      cart.push(product);
    },

    getCart: function () {
      return cart;
    },

    getTotalItems: function () {
      return cart.length;
    },

    // Lägg till andra funktioner för att redigera, ta bort, beräkna totalsumman, etc.
  };
})();

// Visa shopping cart modal när användaren klickar på varukorgssymbolen
const cartIcon = document.getElementById("cart-icon");
const shoppingCartModal = document.getElementById("shopping-cart");

cartIcon.addEventListener("click", function () {
  shoppingCartModal.style.display = "block";
});

// Dölj shopping cart modal när användaren klickar på stängknappen
const closeCart = document.getElementById("close-cart");
closeCart.addEventListener("click", function () {
  shoppingCartModal.style.display = "none";
});

const cartItems = document.getElementById("cart-items");

// Produkter i varukorgen
const cart = [];

// Funktion för att uppdatera varukorgen
function updateCart() {
  cartItems.innerHTML = ""; // Rensa varukorgens innehåll

  cart.forEach(function (product) {
    const cartItem = document.createElement("li");
    cartItem.innerHTML = `
        <img src="${product.image}" alt="${product.title}">
        <div class="cart-item-details">
          <h4>${product.title}</h4>
          <p>Pris: ${product.price}</p>
          <p>Antal: ${product.quantity}</p>
        </div>
        <div class="cart-item-actions">
          <button class="plus">+</button>
          <button class="minus">-</button>
          <button class="remove">Ta bort</button>
        </div>
      `;
    cartItems.appendChild(cartItem);
  });
}

// Funktion för att lägga till en produkt i varukorgen
function addToCart(product) {
  const existingProduct = cart.find((item) => item.title === product.title);
  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    product.quantity = 1;
    cart.push(product);
  }

  updateCart();
}

// Lyssna på "Lägg till i varukorgen"-klick
document.getElementById("add-to-cart").addEventListener("click", function () {
  const productTitle = document.getElementById("product-title").textContent;
  const productPrice = document.getElementById("product-price").textContent;
  const productImage = document.getElementById("product-image").src;

  const product = {
    title: productTitle,
    price: productPrice,
    image: productImage,
  };

  addToCart(product);

  // Uppdatera varukorgslänken i headern
  const cartLink = document.querySelector(".nav-item a");
  cartLink.textContent = `Varukorg (${cart.length})`;
});

// Initiera varukorgen
updateCart();
