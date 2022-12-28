fetch("http://localhost:5678/api/works")
  .then((res) => res.json())
  .then((works) => {
    const gallery = document.getElementsByClassName("gallery");

    // BOUCLE QUI CREE DE NOUVEAUX ELEMENTS SANS INNERHTML
    for (work of works) {
      let newFigure = document.createElement("figure");
      //ne pas oublier le [0] car il s'agit d'une classe et il faut donc sélectionner quelque chose
      gallery[0].appendChild(newFigure);
      newFigure.setAttribute("data-id", work.id);

      let img = document.createElement("img");
      img.setAttribute("crossorigin", "anonymous");
      img.setAttribute("src", work.imageUrl);
      img.setAttribute("alt", work.title);

      let figCaption = document.createElement("figcaption");
      figCaption.textContent = work.title;

      newFigure.appendChild(img);
      newFigure.appendChild(figCaption);
    }
  });

// FONCTION QUI PERMET DE SE CONNECTER OU DE SE DECONNECTER EN FONCTION DU TEXTCONTENT DE LA LI LOGIN OU LOGOUT
const lis = document.getElementsByTagName("li");
const login = lis[2];

login.addEventListener("click", function () {
  if (login.textContent === "login") {
    window.location.href = "login.html";
  } else {
    sessionStorage.removeItem("token");
    window.location.href = "index.html";
  }
});

// FONCTION QUI PERMET D ETRE EN MODE EDITEUR EN FAISANT APPARAITRE LES BOUTONS D ACTIONS
function editPage() {
  let token = sessionStorage.getItem("token");

  if (token) {
    login.textContent = "logout"; // permet de changer le contenu de la li login, pour devenir logout car nous sommes désormais connectés

    // création des boutons modifier et du mode édition

    let imgIntroduction = document.querySelector("#introduction img");
    imgIntroduction.insertAdjacentHTML(
      "afterend",
      `<div class="modify-img"><i class="fa-regular fa-pen-to-square"></i> modifier</div>`
    );

    let description = document.querySelector("#introduction article");
    description.insertAdjacentHTML(
      "afterbegin",
      `<div class="modify-description"><i class="fa-regular fa-pen-to-square"></i> modifier</div>`
    );

    let modifyWorks = document.querySelector("#portfolio  h2");
    modifyWorks.insertAdjacentHTML(
      "beforeend",
      `<div class="modify-works"><i class="fa-regular fa-pen-to-square"></i> modifier</div>`
    );

    let header = document.getElementsByTagName("header");
    let editMode = document.createElement("div");

    editMode.insertAdjacentHTML(
      "afterbegin",
      `<div class= "banner"><i class="fa-regular fa-pen-to-square"></i> Mode édition <button class="button">publier les changements</button></div>`
    );
    header[0].insertBefore(editMode, header[0].firstChild);

    // disparition des filtres en mode édition
    setTimeout (function() {
      const ulfilters = document.getElementById("ulfilters");
      ulfilters.style.display ="none"}, 100);
    
    // augmentation de la margin bottom du titre suite à la suppression des filtres
    const portfolioTitle = document.querySelector("#portfolio h2");
    portfolioTitle.style.marginBottom = "80px";
  }
}

editPage(); //appel de la fonction editPage si l'admin est connecté

// FONCTION QUI PERMET DE FAIRE APPARAITRE LA MODALE POUR MODIFIER LES PROJETS

let modalGenerated = false;
let editWorks = document.getElementsByClassName("modify-works");

// si on clique sur le bouton Modifier des projets
editWorks[0].addEventListener("click", function () {

  // si la modale existe déjà mais était cachée
  if (modalGenerated === true) {
    let outOfModal = document.getElementsByClassName("js-modal-background");
    let modal = document.getElementsByClassName("js-modal");
    modal[0].style.display = "block";
    outOfModal[0].style.display = "block";

  // si la modale (et le background) n'existent pas encore on les créée
  } else if (modalGenerated === false) {
    // background grisé
    let body = document.getElementsByTagName("body");
    let newDiv = document.createElement("div");
    newDiv.className = "js-modal-background";
    body[0].appendChild(newDiv);

    // création entièrement en javascript de la modale via createElement
    let aside = document.createElement("aside");
    aside.className = "js-modal";

    let icone = document.createElement("i");
    icone.className = "fa-solid fa-xmark";
    aside.appendChild(icone);

    let title = document.createElement("h3");
    title.textContent = "Galerie photo";
    aside.appendChild(title);

    // requête à l'api pour récupérer les images des projets
    let jsGalery = document.createElement("div");
    fetch("http://localhost:5678/api/works")
      .then((res) => res.json())
      .then((works) => {
        for (work of works) {
          let newFigure = document.createElement("figure");
          newFigure.setAttribute("data-id", work.id);

          jsGalery.appendChild(newFigure);

          let img = document.createElement("img");
          img.setAttribute("crossorigin", "anonymous");
          img.setAttribute("src", work.imageUrl);
          img.setAttribute("alt", work.title);

          let figCaption = document.createElement("figcaption");
          figCaption.textContent = "éditer";

          let trashbin = document.createElement("i");
          trashbin.className = "fa-solid fa-trash-can";
          trashbin.setAttribute("data-id", work.id);

          newFigure.appendChild(img);
          newFigure.appendChild(trashbin);
          newFigure.appendChild(figCaption);
        }
      });

    aside.appendChild(jsGalery);
    let arrows = document.createElement("i");
    arrows.className = "fa-solid fa-arrows-up-down-left-right";
    aside.appendChild(arrows);

    let button = document.createElement("button");
    button.textContent = "Ajouter une photo";
    aside.appendChild(button);

    let p = document.createElement("p");
    p.textContent = "Supprimer la galerie";
    aside.appendChild(p);

    body[0].appendChild(aside);

    // la modale est générée donc on retoune true pour ne pas multiplier la modale dans le code source
    modalGenerated = true;

    let outOfModal = document.getElementsByClassName("js-modal-background");
    let closeModal = document.getElementsByClassName("fa-xmark");
    let modal = document.getElementsByClassName("js-modal");

    // FERME LA MODALE EN CLIQUANT EN DEHORS DE LA MODALE VIA LE BACKGROUND GRIS
    outOfModal[0].addEventListener("click", function () {
      modal[0].style.display = "none";
      outOfModal[0].style.display = "none";
    });

    // FERME LA MODALE EN CLIQUANT SUR LA CROIX
    closeModal[0].addEventListener("click", function () {
      modal[0].style.display = "none";
      outOfModal[0].style.display = "none";
    });
  }

  // SUPPRESSION D'UN TRAVAIL DE L'ARCHITECTE

  setTimeout (function () {

  const trashbins = document.getElementsByClassName("fa-trash-can");
  for (let trashbin of trashbins) {
  trashbin.addEventListener("click", function() {
  alert( "Item Deleted");
  const fetchUrl = "http://localhost:5678/api/works/" + trashbin.dataset.id;
  fetch(fetchUrl, {
    method: 'DELETE',
    headers: {
      'Authorization': 'Bearer ' + sessionStorage.getItem("token")
    }
  })
  
  document.querySelector(`[data-id="${trashbin.dataset.id}"`).remove(); //supprime le projet de façon dynamique sur la page du site
  trashbin.parentElement.remove();  //supprime le projet dans la modale
  })};}, 100);
});





