fetch("http://localhost:5678/api/works")
  .then((res) => res.json())
  .then((works) => {
    // BOUCLE QUI CREE DE NOUVEAUX ELEMENTS SANS INNERHTML
    for (work of works) {
      addWork();
    }
  });

function addWork() {
  const gallery = document.getElementsByClassName("gallery");
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
    setTimeout(function () {
      const ulfilters = document.getElementById("ulfilters");
      ulfilters.style.display = "none";
    }, 150);

    // augmentation de la margin bottom du titre suite à la suppression des filtres
    const portfolioTitle = document.querySelector("#portfolio h2");
    portfolioTitle.style.marginBottom = "80px";
  }
}

editPage(); //appel de la fonction editPage si l'admin est connecté

// FONCTION QUI PERMET DE FAIRE APPARAITRE LA MODALE POUR MODIFIER LES PROJETS

const body = document.getElementsByTagName("body");
const editWorks = document.getElementsByClassName("modify-works");
let modalGenerated = false;

// background grisé
function createBackground() {
  let newDiv = document.createElement("div");
  newDiv.className = "js-modal-background";
  body[0].appendChild(newDiv);
}
function createModal() {
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
  jsGalery.className = "js-galery";
  aside.appendChild(jsGalery);

  let arrows = document.createElement("i");
  arrows.className = "fa-solid fa-arrows-up-down-left-right";
  aside.appendChild(arrows);

  let divButton = document.createElement("div");
  divButton.className = "div-button";

  let button = document.createElement("button");
  button.textContent = "Ajouter une photo";
  button.id = "addPicture";
  divButton.appendChild(button);

  let p = document.createElement("p");
  p.textContent = "Supprimer la galerie";
  divButton.appendChild(p);

  aside.appendChild(divButton);

  body[0].appendChild(aside);
}

// si on clique sur le bouton Modifier des projets
editWorks[0].addEventListener("click", function () {
  // si la modale existe déjà mais était cachée
  if (modalGenerated === true) {
    modal[0].style.display = "block";
    outOfModal[0].style.display = "block";

    // si la modale (et le background) n'existent pas encore on les créée
  } else if (modalGenerated === false) {
    createBackground();
    createModal();
    // la modale est générée donc on retourne true pour ne pas multiplier la modale dans le code source
    modalGenerated = true;
  }
});

let modal = document.getElementsByClassName("js-modal");
let outOfModal = document.getElementsByClassName("js-modal-background");
let crossModal = document.getElementsByClassName("fa-xmark");
let modalPicture = document.getElementsByClassName("js-modal-picture");
let closeModalTwo = document.getElementsByClassName("close-modale-picture");

function closeModal() {
  modal[0].style.display = "none";
  outOfModal[0].style.display = "none";
  modalPicture[0].style.display = "none";
}

editWorks[0].addEventListener("click", function () {
  // FERME LA MODALE EN CLIQUANT EN DEHORS DE LA MODALE VIA LE BACKGROUND GRIS
  outOfModal[0].addEventListener("click", function () {
    closeModal();
  });

  // FERME LA MODALE EN CLIQUANT SUR LA CROIX
  crossModal[0].addEventListener("click", function () {
    closeModal();
  });
  // FERME LA MODALE PICTURE EN CLIQUANT SUR LA CROIX
  let newProject = document.getElementById("addPicture");
  newProject.addEventListener("click", function () {
    setTimeout(function () {
      closeModalTwo[0].addEventListener("click", function () {
        closeModal(), 150;
      });
    });
  });
});

// SUPPRESSION D'UN TRAVAIL DE L'ARCHITECTE
editWorks[0].addEventListener("click", function () {
  setTimeout(function () {
    const trashbins = document.getElementsByClassName("fa-trash-can");
    for (let trashbin of trashbins) {
      trashbin.addEventListener("click", function () {
        const fetchUrl =
          "http://localhost:5678/api/works/" + trashbin.dataset.id;
        fetch(fetchUrl, {
          method: "DELETE",
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token"),
          },
        });
        document.querySelector(`[data-id="${trashbin.dataset.id}"`).remove(); //supprime le projet de façon dynamique sur la page du site
        trashbin.parentElement.remove(); //supprime le projet dans la modale
        alert("Item Deleted");
      });
    }
  }, 500);
});

// AJOUT DE LA MODALE AJOUTER PROJET

function createModalPicture() {
  // création entièrement en javascript de la modale nouveau projet via createElement
  let aside = document.createElement("aside");
  aside.className = "js-modal-picture";

  let icone = document.createElement("i");
  icone.className = "fa-solid fa-xmark close-modale-picture";
  aside.appendChild(icone);

  let arrow = document.createElement("i");
  arrow.className = "fa-solid fa-arrow-left";
  aside.appendChild(arrow);

  let title = document.createElement("h3");
  title.textContent = "Ajout Photo";
  aside.appendChild(title);

  let modalDivNewPicture = document.createElement("div");
  modalDivNewPicture.className = "new-project";
  modalDivNewPicture.insertAdjacentHTML(
    "afterbegin",
    `<form enctype="multipart/form-data" method="post" name="sendwork">
   <input type="file" name="workimage" id="form-img" required/><br />
   <label>Titre</label><br />
   <input type="text" name="worktitle" required id="form-title"/><br />
   <label>Catégorie</label><br />
   <select name="workcategory" id="form-category" required>
      <option value=""></option>
      <option value="1">Objets</option>
      <option value="2">Appartements</option>
      <option value="3">Hotels & restaurants</option>
    </select>
   </form>
  `
  );
  aside.appendChild(modalDivNewPicture);

  let divButtonValider = document.createElement("div");
  divButtonValider.className = "button-valider";
  let button = document.createElement("button");
  button.textContent = "Valider";
  button.className = "submit-work grey-button";
  divButtonValider.appendChild(button);
  aside.appendChild(divButtonValider);

  body[0].appendChild(aside);
}

let modalPictureGenerated = false;

editWorks[0].addEventListener("click", function () {
  let newProject = document.getElementById("addPicture");
  newProject.addEventListener("click", function () {
    modal[0].style.display = "none"; // ferme la modale car on fait apparaître la modale picture

    if (modalPictureGenerated === true) {
      modalPicture[0].style.display = "block"; //on refait apparaître la modale picture si elle existe déjà
    } else if (modalPictureGenerated === false) {
      //si la modale n'existe pas on appelle la fonction createModalPicture
      createModalPicture();
      // la modale est générée donc on retoune true pour ne pas multiplier la modale picture dans le code source
      modalPictureGenerated = true;
    }
  });
});

// RETOURNE SUR L'ANCIENNE MODALE SI ON CLIQUE SUR PRECEDENT
editWorks[0].addEventListener("click", function () {
  let newProject = document.getElementById("addPicture");
  newProject.addEventListener("click", function () {
    let previously = document.getElementsByClassName("fa-arrow-left");
    previously[0].addEventListener("click", function () {
      modalPicture[0].style.display = "none";
      modal[0].style.display = "block";
    });
  });
});

// ENVOYER UN NOUVEAU PROJET

function sendWork() {
  const workimage = document.getElementById("form-img");
  const worktitle = document.getElementById("form-title");
  const workcategory = document.getElementById("form-category");
  const data = new FormData();
  data.append("image", workimage.files[0]);
  data.append("title", worktitle.value);
  data.append("category", workcategory.value);
  console.log(workimage.value, worktitle.value, workcategory.value);
  console.log(data);
  fetch("http://localhost:5678/api/works", {
    method: "POST",
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("token"),
    },
    body: data,
  })
    .then((res) => res.json())
    .then((log) => console.log(log));
}

// SI ON CLIQUE SUR LE BOUTON VALIDER PROJET ON APPELLE LA FONCTION SENDWORK
editWorks[0].addEventListener("click", function () {
  let newProject = document.getElementById("addPicture");

  newProject.addEventListener("click", function () {
    setTimeout(function () {
      let submitWork = document.getElementsByClassName("submit-work");

      submitWork[0].addEventListener("click", function () {
          sendWork();
        },
        200
      );
    });
  });
});
