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
    const cartItem = document.createElement("div");
    cartItem.className = "cart-item-style";
    cartItem.innerHTML = `
        <img src="${product.image}" alt="${product.title}">
        <div class="cart-item-details">
          <h4>${product.title}</h4>
          <p>Pris: ${product.price}</p>
          <p>Antal: ${product.quantity}</p>
        </div>
        <div class="cart-item-actions">
          <button class="btn btn-outline-secondary remove">Ta bort</button>
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

// "Lägg till i varukorgen"
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

  // Uppdatera varukorgsräknaren i headern
  const cartLink = document.getElementById("cart-link");
  cartLink.textContent = `(${getTotalCartQuantity()})`;
});

function getTotalCartQuantity() {
  return cart.reduce((total, product) => total + product.quantity, 0);
}

// klick för "Ta bort" -knappen
document
  .getElementById("cart-items")
  .addEventListener("click", function (event) {
    const clickedElement = event.target;
    if (clickedElement.classList.contains("remove")) {
      const productIndex = Array.from(
        clickedElement.parentNode.parentNode.parentNode.children
      ).indexOf(clickedElement.parentNode.parentNode);

      // letar upp och tar bort produkten
      if (productIndex >= 0) {
        cart.splice(productIndex, 1);
        // Uppdatera varukorgsgränssnittet
        updateCart();
        const cartLink = document.getElementById("cart-link");
        cartLink.textContent = `(${getTotalCartQuantity()})`;
      }
    }
  });

// Initiera varukorgen
updateCart();
