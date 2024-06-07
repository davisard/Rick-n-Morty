// VARIABLES

let chatacter = "";
const modal = document.getElementById("modal");
const closeButton = document.getElementById("close-button");
const modalContent = document.getElementById("modal-content");
const overlay = document.getElementById("overlay");

// EVENT LISTENERS

wrapper.addEventListener("click", async function (e) {
  let clickedEl = e.target;
  let clickedCard = clickedEl.closest(".card");

  if (clickedCard) {
    const idKey = clickedCard.id;
    const charInfoUrl = `${apiUrl}/${idKey}`;
    try {
      const res = await fetch(charInfoUrl);
      const data = await res.json();
      modalContent.innerHTML = `<img
      src="${data.image}"
      alt=""
    />
    <div class="character-info">
      <p id="character-name">NAME: ${data.name}</p>
      <p id="character-gender">GENDER: ${data.gender}</p>
      <p id="character-species">SPECIES: ${data.species}</p>
      <p id="character-location">LOCATION: ${data.location.name}</p>
    </div>`;
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

function openModal() {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
}

function closeModal() {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
}
