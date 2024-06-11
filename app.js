let wrapper = document.querySelector(".wrapper");
window.onload = () => {
  const login = `<div class="credentials">
                    <form action="" >
                    <input
                        type="text"
                        id="username"
                        name="username"
                        placeholder="Username"
                        required
                    />
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Password"
                        required
                    />
                    <p class="error hidden">Both Fields Required!</p>
                    <input type="submit" id="submit" value="LOG IN" />
                    </form>
                </div>`;
  wrapper.innerHTML = login;

  const credentials = [
    {
      username: "user1",
      password: "pass1",
    },
    {
      username: "user2",
      password: "pass2",
    },
    {
      username: "user3",
      password: "pass3",
    },
    {
      username: "user4",
      password: "pass4",
    },
  ];

  document.getElementById("submit").addEventListener("click", logIn);

  //PROMENITI (IZBACITI FOR PETLJU)
  function logIn(e) {
    e.preventDefault();
    let user = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    for (let i = 0; i < credentials.length; i++) {
      if (!user || !password) {
        document.querySelector(".error").innerHTML = "Both Fields Required!";
        document.querySelector(".error").classList.remove("hidden");
      } else if (
        credentials[i].username == user &&
        credentials[i].password == password
      ) {
        document.querySelector(".error").classList.add("hidden");
        window.location.href = "/home.html";
      } else {
        document.querySelector(".error").innerHTML =
          "Username or Password Incorrect!";
        document.querySelector(".error").classList.remove("hidden");
      }
    }
  }
};
