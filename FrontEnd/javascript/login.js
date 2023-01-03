// CHANGER LE STYLE SANS TOUCHER AU HTML
const footer = document.getElementsByTagName("footer");
const lis = document.getElementsByTagName("li");
const login = lis[2];
const main = document.getElementsByTagName("main");

let message = document.createElement("div");

login.style.fontWeight = "bold";
footer[0].style.marginTop = "280px";

// CONNEXION DE L ADMIN VIA L API

const submit = document.getElementById("button-login");
const email = document.getElementById("email");
const password = document.getElementById("password");

submit.addEventListener("click", function (event) {
  event.preventDefault();
  let user = {
    email: email.value,
    password: password.value,
  };

  fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(user),
  })
  .then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      throw new Error(res.statusText);
    }
  })
  .then((loginInfos) => {
    if (loginInfos.token) {
      sessionStorage.setItem("token", loginInfos.token); // on stocke le token dans la sessionStorage
      window.location.href = "index.html"; // puis on redirige vers la page principale
    } else {
      throw new Error("Invalid response from server");
    }
  })
  .catch((error) => {
    if (error.message == "Unauthorized" || error.message == "Not Found") {
      alert("Erreur dans l’identifiant ou le mot de passe");
    } else {
      alert("Erreur inconnue : " + error.message);
    }
  })
  .catch((error) => {
    console.error(error);
    alert("Erreur de réseau ou délai d'expiration de la requête");
  });
});
