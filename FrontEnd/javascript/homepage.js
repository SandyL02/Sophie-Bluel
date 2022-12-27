fetch("http://localhost:5678/api/works")
  .then((res) => res.json())
  .then((works) => {
    const gallery = document.getElementsByClassName("gallery");

    // BOUCLE QUI CREE DE NOUVEAUX ELEMENTS SANS INNERHTML
    for (work of works) {
      let newFigure = document.createElement("figure");
      //ne pas oublier le [0] car il s'agit d'une classe et il faut donc sélectionner quelque chose
      gallery[0].appendChild(newFigure);

      let img = document.createElement("img");
      img.setAttribute("crossorigin", "anonymous");
      img.setAttribute("src", work.imageUrl);
      img.setAttribute("alt", work.title);
      
      let figCaption = document.createElement("figcaption");
      figCaption.textContent= work.title;
      
      newFigure.appendChild(img);
      newFigure.appendChild(figCaption);
    }
  });

// FONCTION QUI PERMET DE SE CONNECTER OU DE SE DECONNECTER EN FONCTION DU TEXTCONTENT DE LA LI LOGIN OU LOGOUT
const lis = document.getElementsByTagName("li");
const login = lis[2];

login.addEventListener("click", function() {
  if (login.textContent=== "login") {
  window.location.href="login.html";
   } else {
  sessionStorage.removeItem("token");
      window.location.href="index.html";
}});

// FONCTION QUI PERMET D ETRE EN MODE EDITEUR EN FAISANT APPARAITRE LES BOUTONS D ACTIONS
  function editPage() {
    let token = sessionStorage.getItem('token');
  
    if (token) {
      login.textContent= "logout"; // permet de changer le contenu de la li login, pour devenir logout car nous sommes désormais connectés
      
      // création des boutons modifier et du mode édition

      let imgIntroduction = document.querySelector("#introduction img");
      imgIntroduction.insertAdjacentHTML("afterend",`<div class="modify-img"><i class="fa-regular fa-pen-to-square"></i> modifier</div>`);
      
      let description = document.querySelector("#introduction article");
      description.insertAdjacentHTML("afterbegin",`<div class="modify-description"><i class="fa-regular fa-pen-to-square"></i> modifier</div>`);


      let modifyWorks = document.querySelector("#portfolio  h2");
      modifyWorks.insertAdjacentHTML("beforeend",`<div class="modify-works"><i class="fa-regular fa-pen-to-square"></i> modifier</div>`);

      let header = document.getElementsByTagName("header");
      let editMode = document.createElement("div");
      
      editMode.insertAdjacentHTML("afterbegin",`<div class= "banner"><i class="fa-regular fa-pen-to-square"></i> Mode édition <button class="button">publier les changements</button></div>`);
      header[0].insertBefore(editMode, header[0].firstChild);

      
    }
  }

  editPage(); //appel de la fonction editPage si l'admin est connecté

// FONCTION QUI PERMET DE FAIRE APPARAITRE LA MODALE POUR MODIFIER LES PROJETS

  let editWorks= document.getElementsByClassName("modify-works");
  editWorks[0].addEventListener("click", function() {

    // background grisé
    let body = document.getElementsByTagName("body");
    let newDiv = document.createElement("div");
    newDiv.className ="js-modal-background";
    body[0].appendChild(newDiv);

    // création de la modale
    let aside = document.createElement("aside");
    aside.className ="js-modal";

    let icone = document.createElement("i");
    icone.className = "fa-solid fa-xmark";
    aside.appendChild(icone);

    let title = document.createElement("h3");
    title.textContent ="Galerie photo"
    aside.appendChild(title);

    let div = document.createElement("div");
    aside.appendChild(div);

    let button = document.createElement("button");
    button.textContent= "Ajouter une photo";
    aside.appendChild(button);

    let p = document.createElement("p");
    p.textContent= "Supprimer la galerie";
    aside.appendChild(p);

    body[0].appendChild(aside);
  
  });

  



  