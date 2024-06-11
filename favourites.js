// VARIABLES

const wrapper = document.querySelector(".wrapper");
const home = document.getElementById("home-link");
const modal = document.getElementById("modal");
const modalContent = document.getElementById("modal-content");
const overlay = document.getElementById("overlay");
const closeButton = document.getElementById("close-button");

// EVENT LISTENERS

// Home button
home.addEventListener("click", () => (window.location.href = "/home.html"));
wrapper.addEventListener("click", openModal);
// Display favourite characters
window.onload = updateCharacters;
overlay.addEventListener("click", closeModal);
//close modal
closeButton.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    closeModal();
  }
});

// FUNCTIONS

//create and display cards on favs page
function updateCharacters() {
  wrapper.innerHTML = "";
  let favourites = JSON.parse(localStorage.getItem("localFavs")) || [];

  favourites.forEach((character) => {
    let characterCard = document.createElement("div");
    characterCard.classList.add("card", "check");
    let card = `<img src="${character.image}" alt="character image" class="check">
          <p class="check">${character.name}</p>`;
    characterCard.innerHTML = card;
    characterCard.id = `${character.id}`;
    wrapper.appendChild(characterCard);
  });
}

//open modal and remove element from favourites list (local storage)
function openModal(e) {
  const clickedEl = e.target;
  const clickedCard = clickedEl.closest(".card");
  if (clickedCard) {
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
    const idKey = clickedCard.id;
    const char = JSON.parse(localStorage.getItem("localFavs")).find(
      (character) => character.id == idKey
    );

    modalContent.innerHTML = `<div class="fav-button">
    <svg
      id="fav-button"
      width="40"
      height="50"
      viewBox="0 0 52 92"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M50 92C49.6484 92 49.3047 91.9063 48.9922 91.7266L26 78.3125L3.00781 91.7266C2.39063 92.0859 1.625 92.0937 1.00781 91.7344C0.382812 91.375 0 90.7188 0 90V2C0 0.898438 0.898438 0 2 0H50C51.1094 0 52 0.898438 52 2V90C52 90.7188 51.6172 91.375 50.9922 91.7344C50.6875 91.9141 50.3438 92 50 92Z"
        fill="rgb(51, 51, 51)"
      />
    </svg>
  </div>
  <img src="${char.image}" alt="" />
  <div class="character-info">
    <p id="character-name">NAME: ${char.name}</p>
    <p id="character-gender">GENDER: ${char.gender}</p>
    <p id="character-species">SPECIES: ${char.species}</p>
    <p id="character-location">LOCATION: ${char.location.name}</p>
  </div>`;
    document.querySelector(".fav-button").addEventListener("click", () => {
      removeFavourite(char);
      closeModal();
    });
  }
}

function closeModal() {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
  updateCharacters();
}

function removeFavourite(char) {
  let favourites = JSON.parse(localStorage.getItem("localFavs"));
  favourites = favourites.filter((character) => character.id !== char.id);
  localStorage.setItem("localFavs", JSON.stringify(favourites));
}
