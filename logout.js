const logoutBtn = document.getElementById("logout-link");

logoutBtn.addEventListener("click", logout);

function logout() {
  window.location.href = "/index.html";
}
