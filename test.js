let wrapper = document.querySelector(".wrapper");
let characterArr = [];
const speciesDropdown = document.getElementById("spiecies-select");
const statusDropdown = document.getElementById("status-select");
const genderDropdown = document.getElementById("gender-select");
const nameSearch = document.getElementById("name-input");

fetch("https://rickandmortyapi.com/api/character")
  .then((response) => response.json())
  .then((data) => {
    characterArr = data.results;
    console.log(data);
    updateCharacters();
    // console.log(characterArr);
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });

speciesDropdown.addEventListener("change", updateCharacters);
statusDropdown.addEventListener("change", updateCharacters);
genderDropdown.addEventListener("change", updateCharacters);
nameSearch.addEventListener("keyup", function (e) {
  if (e.key === "Enter") updateCharacters();
});

function updateCharacters() {
  const selectedSpecies = speciesDropdown.value;
  const selectedStatus = statusDropdown.value;
  const selectedGender = genderDropdown.value;
  const selectedName = nameSearch.value;

  const filteredCharacters = characterArr.filter((character) => {
    return (
      (!selectedSpecies || character.species === selectedSpecies) &&
      (!selectedStatus || character.status === selectedStatus) &&
      (!selectedGender || character.gender === selectedGender) &&
      (!selectedName ||
        character.name.toLowerCase() === selectedName.toLowerCase())
    );
  });

  // Display filtered characters
  wrapper.innerHTML = "";
  filteredCharacters.forEach((character) => {
    let characterCard = document.createElement("div");
    characterCard.classList.add("card");
    let card = `<img src="${character.image}" alt="character image">
          <p>${character.name}</p>`;
    characterCard.innerHTML = card;
    wrapper.appendChild(characterCard);
  });
}
