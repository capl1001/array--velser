// console.log("Test");

// const undervisere = ["Anders", "Alan", "Stine"];
// console.log(undervisere);

// const section = document.querySelector("section");

// undervisere.forEach(visNavne);

// function visNavne(elm) {
//   section.innerHTML += `<p>${elm}</p>`;
// }

const cat = new URLSearchParams(window.location.search).get("cat");

const endpoint = `https://kea-alt-del.dk/t7/api/products?category=${cat}`;

const produktliste = document.querySelector("section");

const h2 = document.querySelector("h2");
h2.textContent = cat;

fetch(endpoint)
  .then((res) => res.json())
  .then(visData);

function visData(json) {
  console.log(json);
  json.forEach((element) => {
    const tilbudspris = Math.round(element.price - (element.price * element.discount) / 100);
    produktliste.innerHTML += `
    <a href=productdetails.html?id=${element.id} class=${element.soldout ? "udsolgt" : ""}>
    <article class="card">
    <img src=https://kea-alt-del.dk/t7/images/webp/640/${element.id}.webp alt="produktbillede" />
    <h2>${element.brandname}</h2>
    <h3>${element.productdisplayname}</h3>
    
    ${element.soldout ? `<span class="soldout-label">UDSOLGT</span>` : ""}

  ${
    element.discount
      ? `
    <p class="tilbudslabel">${element.discount}%</p>
    <p>Nu kr. ${tilbudspris},- <span>(før ${element.price},-)</span></p>`
      : `<p>kr. ${element.price},- </p>`
  }

  <p>${element.subcategory}</p>
  </article>
  </a>`;
  });
}
