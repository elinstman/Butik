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

class Cart {
  constructor() {
    this.items = localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [];
  }
  // Funktion för att lägga till en produkt i varukorgen
  addToCart(product) {
    const existingProduct = this.items.find(
      (item) => item.title === product.title
    );
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      product.quantity = 1;
      this.items.push(product);
    }
    this.updateCart();
    localStorage.setItem("cart", JSON.stringify(this.items));
  }

  getTotalCartQuantity() {
    return this.items.reduce((total, product) => total + product.quantity, 0);
  }

  removeProduct(productIndex) {
    this.items.splice(productIndex, 1);
    localStorage.setItem("cart", JSON.stringify(this.items));
    // Uppdatera varukorgsgränssnittet
    this.updateCart();
  }

  // Funktion för att uppdatera varukorgen
  updateCart() {
    const cartItems = document.getElementById("cart-items");
    cartItems.innerHTML = ""; // Rensa varukorgens innehåll

    this.items.forEach(function (product) {
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
          <button class="btn btn-outline-secondary btn-sm remove">Ta bort</button>
        </div>
      `;
      cartItems.appendChild(cartItem);
    });
    const cartLink = document.getElementById("cart-link");
    cartLink.textContent = `(${this.getTotalCartQuantity()})`;
  }
}

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
let cart = new Cart();

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

  cart.addToCart(product);
});

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
        cart.removeProduct(productIndex);
      }
    }
  });

// Initiera varukorgen
cart.updateCart();
