const id = new URLSearchParams(window.location.search).get("id");
// console.log(id);

const endpoint = `https://kea-alt-del.dk/t7/api/products/${id}`;

const product = document.querySelector("#product");
const backbutton = document.querySelector("#backbutton");

backbutton.addEventListener("click", () => history.back());

fetch(endpoint)
  .then((res) => res.json())
  .then(visData);

function visData(element) {
  console.log(element);

  product.innerHTML += `
    <article class="product-detail">
      <img src="https://kea-alt-del.dk/t7/images/webp/640/${element.id}.webp" alt="produktbillede" />
      
      <div class="product-info">
        <h2>${element.brandname}</h2>
        <h1>${element.productdisplayname}</h1>
        <p class="price">${element.price} kr.</p>
        <p class="category">${element.subcategory}</p>
        <p class="description">${element.description}</p>
        
        <button class="buy-button">Læg i kurv</button>
      </div>
    </article>
  `;
}
