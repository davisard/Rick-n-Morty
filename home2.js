// VARIABLES

let characterArr = [];
const wrapper = document.querySelector(".wrapper");
const dropdownSpecies = document.getElementById("spiecies-select");
const dropdownStatus = document.getElementById("status-select");
const dropdownGender = document.getElementById("gender-select");
const dropdownName = document.getElementById("name-input");
const apiUrl = "https://rickandmortyapi.com/api/character";

// EVENT LISTENERS

window.onload = fetchData;
dropdownSpecies.addEventListener("change", fetchData);
dropdownStatus.addEventListener("change", fetchData);
dropdownGender.addEventListener("change", fetchData);
dropdownName.addEventListener("keyup", function (e) {
  if (e.key === "Enter") fetchData();
});

// FUNCTIONS

async function fetchData() {
  const species = dropdownSpecies.value;
  const status = dropdownStatus.value;
  const gender = dropdownGender.value;
  const name = dropdownName.value;

  const newUrl = `${apiUrl}?gender=${gender}&species=${species}&status=${status}&name=${name}`;

  try {
    const res = await fetch(newUrl);
    const data = await res.json();
    characterArr = data.results;
    updateCharacters();
    console.log(data.results);
    console.log(newUrl);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function updateCharacters() {
  wrapper.innerHTML = "";
  characterArr.forEach((character) => {
    let characterCard = document.createElement("div");
    characterCard.classList.add("card");
    let card = `<img src="${character.image}" alt="character image">
          <p>${character.name}</p>`;
    characterCard.innerHTML = card;
    wrapper.appendChild(characterCard);
  });
}
