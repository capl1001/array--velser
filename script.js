// console.log("Test");

// const undervisere = ["Anders", "Alan", "Stine"];
// console.log(undervisere);

// const section = document.querySelector("section");

// undervisere.forEach(visNavne);

// function visNavne(elm) {
//   section.innerHTML += `<p>${elm}</p>`;
// }

const cat = new URLSearchParams(window.location.search).get("cat");
const endpoint = `https://kea-alt-del.dk/t7/api/products?category=${cat}&limit=30`;
const produktliste = document.querySelector("section");
const visantal = document.querySelector("#filtre span");
const h2 = document.querySelector("h2");
h2.textContent = cat;

let alleData, udsnit;

document.querySelectorAll("#filtre button").forEach((knap) => knap.addEventListener("click", filtrer));
document.querySelectorAll("#sortering button").forEach((knap) => knap.addEventListener("click", sorter));

function filtrer(e) {
  console.log(e.target.textContent);

  const valgt = e.target.textContent;

  if (valgt == "Alle") {
    udsnit = alleData;
  } else {
    udsnit = alleData.filter((element) => element.gender == valgt);
  }
  console.log(alleData, udsnit);

  visData(udsnit);
}

function beregnPris(element) {
  if (element.discount) {
    return Math.round(element.price - (element.price * element.discount) / 100);
  } else {
    return element.price;
  }
}
//e=event, viser hvad som bliver kligget på
function sorter(e) {
  const valgt = e.target.textContent;
  console.log(valgt);
  if (valgt == "Pris lav-høj") {
    udsnit.sort((a, b) => beregnPris(a) - beregnPris(b));
  } else if (valgt == "Pris høj-lav") {
    udsnit.sort((a, b) => beregnPris(b) - beregnPris(a));
  } else if (valgt == "A-Z") {
    udsnit.sort((a, b) => a.brandname.localeCompare(b.brandname));
  } else if (valgt == "Z-A") {
    udsnit.sort((a, b) => b.brandname.localeCompare(a.brandname));
  }

  visData(udsnit);
}

fetch(endpoint)
  .then((res) => res.json())
  .then((data) => {
    alleData = udsnit = data;
    visData(data);
  });

function visData(json) {
  visantal.textContent = json.length;
  // console.log(json);
  produktliste.innerHTML = "";
  json.forEach((element) => {
    const tilbudspris = beregnPris(element);
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
