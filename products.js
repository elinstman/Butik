const PRODUCTS_URL = "https://fakestoreapi.com/products";

// För att hämta produkterna
const getProducts = async () => {
  try {
    const response = await fetch(PRODUCTS_URL);
    const data = await response.json();
    console.log(data);
    const productContainer = document.getElementById("product-container");

    data.forEach((product) => {
      const productCard = document.createElement("div");
      productCard.classList.add("product-card");
      productCard.innerHTML = `
      <img src="${product.image}" alt="${product.title}">
      <div class="product-card-details"> 
      <h2>${product.title}</h2>
      <p>Price: $${product.price}</p>
      <p>Rating: ${product.rating.rate}</p>
      </div>
      `;

      productContainer.appendChild(productCard);
    });

    // Hämta modalen och stängningsknappen
    const modal = document.getElementById("product-modal");
    const closeBtn = document.querySelector(".close-modal");

    // Hämta produktinformationselementen
    const productImage = document.getElementById("product-image");
    const productTitle = document.getElementById("product-title");
    const productPrice = document.getElementById("product-price");
    const productRating = document.getElementById("product-rating");
    const productDescription = document.getElementById("product-description");

    // Hämta alla produktkort
    const productCards = document.querySelectorAll(".product-card");

    // Lägg till en klickhändelse på varje produktkort
    productCards.forEach((productCard, index) => {
      productCard.addEventListener("click", () => {
        const product = data[index]; // Hämta produktinformation från din data
        productImage.src = product.image;
        productTitle.textContent = product.title;
        productPrice.textContent = `Price: $${product.price}`;
        productRating.textContent = `Betyg: ${product.rating.rate}`;
        productDescription.textContent = product.description;
        modal.style.display = "block";
        console.log(data);
      });
    });

    // Lägg till en klickhändelse på stängningsknappen för att stänga modalen
    closeBtn.addEventListener("click", () => {
      modal.style.display = "none";
    });
  } catch (error) {
    console.log(error);
  }
};

getProducts();
