// CHANGER LE STYLE EN MANIPULANT LE DOM UNIQUEMENT
document.getElementsByTagName("li")[2].style.fontWeight = "bold";
document.getElementsByTagName("footer")[0].style.marginTop = "280px";
/**
 * CONNEXION DE L ADMIN VIA L API
 */
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
        document.cookie = "token=" + loginInfos.token; // on stocke le token dans un cookie
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
    });
});
