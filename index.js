const endpoint = "https://kea-alt-del.dk/t7/api/categories";

const catlistContainer = document.querySelector("#catlistContainer");

fetch(endpoint)
  .then((res) => res.json())
  .then(visData);

function visData(json) {
  console.log(json);
  json.forEach((element) => {
    catlistContainer.innerHTML += `
    <a href="productlist.html?cat=${element.category}"> ${element.category}</a>`;
  });
}
