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
  <div class="edit-btn">
    <svg
      id="edit-btn"
      fill="#000000"
      version="1.1"
      id="Capa_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 494.936 494.936"
      xml:space="preserve"
      >
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          <g>
            <g>
              <path
                d="M389.844,182.85c-6.743,0-12.21,5.467-12.21,12.21v222.968c0,23.562-19.174,42.735-42.736,42.735H67.157 c-23.562,0-42.736-19.174-42.736-42.735V150.285c0-23.562,19.174-42.735,42.736-42.735h267.741c6.743,0,12.21-5.467,12.21-12.21 s-5.467-12.21-12.21-12.21H67.157C30.126,83.13,0,113.255,0,150.285v267.743c0,37.029,30.126,67.155,67.157,67.155h267.741 c37.03,0,67.156-30.126,67.156-67.155V195.061C402.054,188.318,396.587,182.85,389.844,182.85z"
              ></path>
              <path
                d="M483.876,20.791c-14.72-14.72-38.669-14.714-53.377,0L221.352,229.944c-0.28,0.28-3.434,3.559-4.251,5.396l-28.963,65.069 c-2.057,4.619-1.056,10.027,2.521,13.6c2.337,2.336,5.461,3.576,8.639,3.576c1.675,0,3.362-0.346,4.96-1.057l65.07-28.963 c1.83-0.815,5.114-3.97,5.396-4.25L483.876,74.169c7.131-7.131,11.06-16.61,11.06-26.692 C494.936,37.396,491.007,27.915,483.876,20.791z M466.61,56.897L257.457,266.05c-0.035,0.036-0.055,0.078-0.089,0.107 l-33.989,15.131L238.51,247.3c0.03-0.036,0.071-0.055,0.107-0.09L447.765,38.058c5.038-5.039,13.819-5.033,18.846,0.005 c2.518,2.51,3.905,5.855,3.905,9.414C470.516,51.036,469.127,54.38,466.61,56.897z"
              ></path>
            </g>
          </g>
        </g>
    </svg>
  </div>

  <img src="${char.image}" alt="" />
  <div class="character-info">
    <p id="character-name">NAME: ${char.name}</p>
    <p id="character-gender">GENDER: ${char.gender}</p>
    <p id="character-species">SPECIES: ${char.species}</p>
    <p id="character-location">LOCATION: ${char.location.name}</p>
  </div>
  <div class="editor">
    <form onsubmit="event.preventDefault();">
      <label for="input1">Change Name:</label><br>
      <input type="text" id="input1" name="input1" placeholder="Name..."><br>
      <label for="input2">Change Species:</label><br>
      <input type="text" id="input2" name="input2" placeholder="Species..."><br>
      
      <label for="select1">Change Status:</label><br>
      <select id="select1" name="select1">
        <option value="">Status</option>
        <option value="dead">Dead</option>
        <option value="alive">Alive</option>
        <option value="unknown">Unknown</option>

      </select><br>
      
      <label for="select2">Change Gender:</label><br>
      <select id="select2" name="select2">
        <option value="">Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="unknown">Unknown</option>

      </select><br>
      
      <button id="submit-btn">Change</button>
    </form>

  <div>`;
    document.querySelector(".fav-button").addEventListener("click", () => {
      removeFavourite(char);
      closeModal();
    });
    document.querySelector(".edit-btn").addEventListener("click", () => {
      document.querySelector(".editor").classList.toggle("editor-active");
    });
    document.getElementById("submit-btn").addEventListener("click", () => {
      changeCharacter(char);
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

function changeCharacter(char) {
  const newName = document.getElementById("input1").value;
  const newSpecies = document.getElementById("input2").value;
  const newStatus = document.getElementById("select1").value;
  const newGender = document.getElementById("select2").value;

  let original = JSON.parse(localStorage.getItem("localFavs"));
  original = original.filter((character) => character.id !== char.id);
  if (newName) char.name = newName;
  if (newSpecies) char.species = newSpecies;
  if (newStatus) char.newStatus = newStatus;
  if (newGender) char.gender = newGender;

  original.unshift(char);
  localStorage.setItem("localFavs", JSON.stringify(original));
}
