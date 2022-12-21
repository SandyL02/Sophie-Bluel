const lis = document.getElementsByTagName("li");
const login = lis[2];
const main = document.getElementsByTagName("main");
const footer = document.getElementsByTagName("footer");

// fonction qui reset le HTML contenu dans main et appelle le formulaire pour se connecter
login.addEventListener("click", function () {
  main[0].innerHTML = `<section id="form-login">
            <h2>Log In</h2>
                <form action="#" method="post">
                    <label for="email">E-mail</label>
                    <input type="email" name="email" id="email">
                    <label for="password">Mot de passe</label>
                    <input type="password" name="password" id="password">
                    <input type="submit" value="Se connecter">
                </form>
                <a href="#">Mot de passe oublié</a>
        </section>`;
  login.style.fontWeight = "bold";
  footer[0].style.marginTop = "250px";
});
