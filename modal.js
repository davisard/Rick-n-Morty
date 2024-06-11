// VARIABLES
let favourites = JSON.parse(localStorage.getItem("localFavs")) || [];
const modal = document.getElementById("modal");
// const favButton = document.querySelector(".fav-button");
const closeButton = document.getElementById("close-button");
const modalContent = document.getElementById("modal-content");
const overlay = document.getElementById("overlay");
// EVENT LISTENERS

wrapper.addEventListener("click", async function (e) {
  let clickedEl = e.target;
  let clickedCard = clickedEl.closest(".card");

  if (clickedCard) {
    const idKey = clickedCard.id;
    const charInfoUrl = `https://rickandmortyapi.com/api/character/${idKey}`;
    try {
      const res = await fetch(charInfoUrl);
      const data = await res.json();
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
          <img src="${data.image}" alt="" />
          <div class="character-info">
            <p id="character-name">NAME: ${data.name}</p>
            <p id="character-gender">GENDER: ${data.gender}</p>
            <p id="character-species">SPECIES: ${data.species}</p>
            <p id="character-location">LOCATION: ${data.location.name}</p>
          </div>`;

      // FAVOURITES BUTTON
      addToFavourites(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    openModal();
  }
});

closeButton.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    closeModal();
  }
});

// FUNCTIONS

// open-close modal
function openModal() {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
}

function closeModal() {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
}

// favourites
function addToFavourites(data) {
  document.querySelector(".fav-button").addEventListener("click", function () {
    const isFavourite = favourites.some(
      (character) => character.id === data.id
    );
    if (isFavourite) {
      favourites = favourites.filter((character) => character.id !== data.id);
    } else {
      favourites.push(data);
    }
    localStorage.setItem("localFavs", JSON.stringify(favourites));
    animate();
  });
}

function animate() {
  modal.classList.add("shake");
  modal.addEventListener("animationend", () => modal.classList.remove("shake"));
}
