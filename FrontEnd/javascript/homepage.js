/**
 * FONCTION QUI AJOUTE DYNAMIQUEMENT LES PROJETS A LA GALERIE
 */
function gallery() {fetch("http://localhost:5678/api/works")
  .then((res) => res.json())
  .then((works) => {
    // boucle qui créé de nouveaux projets via l'api
    for (work of works) {
      addWork(work);
    }
  })};
gallery();
/**
 * FONCTION QUI CREE UN PROJET DANS LE DOM VIA JAVASCRIPT
 * @param {string} work 
 */
function addWork(work) {
  const gallery = document.getElementsByClassName("gallery");
  let newFigure = document.createElement("figure");
  
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
/**
 * FONCTION QUI PERMET DE SE CONNECTER OU DE SE DECONNECTER EN FONCTION DU TEXTCONTENT DE LA LI LOGIN OU LOGOUT
 */
const login =document.getElementsByTagName("li")[2];
login.addEventListener("click", function () {
  if (login.textContent === "login") {
    window.location.href = "login.html"; // renvoie à la page login si le texte est login
  } else {
    document.cookie = "token=;expires=Thu, 01 Jan 1970 00:00:01 GMT";
    window.location.href = "index.html"; //si le texte n'est pas login (donc logout) renvoie à l'index, supprime le token et recharge la page, on sera donc déconnecté
  }
});
/**
 * FONCTION POUR RECUPERER LE COOKIE QUE L'ON STOCKE DANS UNE CONSTANTE TOKEN
 * @param {string} name 
 * @returns 
 */
function getCookie(name) {
  const value = "; " + document.cookie;
  const parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
};
const token = getCookie("token");
/**
 * FONCTION QUI PERMET D'ETRE EN MODE EDITEUR EN FAISANT APPARAITRE LES BOUTONS D'ACTIONS
 */
function editPage() {
    login.textContent = "logout"; // permet de changer le contenu de la li login, pour devenir logout car nous sommes désormais connectés
    // création des boutons modifier et du mode édition
    document.querySelector("#introduction img").insertAdjacentHTML(
      "afterend",
      `<div class="modify-img"><i class="fa-regular fa-pen-to-square"></i> modifier</div>`
    );
    document.querySelector("#introduction article").insertAdjacentHTML(
      "afterbegin",
      `<div class="modify-description"><i class="fa-regular fa-pen-to-square"></i> modifier</div>`
    );
    document.querySelector("#portfolio  h2").insertAdjacentHTML(
      "beforeend",
      `<div class="modify-works"><i class="fa-regular fa-pen-to-square"></i> modifier</div>`
    );
    let editMode = document.createElement("div");
    editMode.insertAdjacentHTML(
      "afterbegin",
      `<div class= "banner"><i class="fa-regular fa-pen-to-square"></i> Mode édition <button class="button">publier les changements</button></div>`
    );
    document.getElementsByTagName("header")[0].insertBefore(editMode, document.getElementsByTagName("header")[0].firstChild);
    // disparition des filtres en mode édition
    setTimeout(function () {
      document.getElementById("ulfilters").style.display = "none";
    // augmentation de la margin bottom du titre suite à la suppression des filtres
      document.querySelector("#portfolio h2").style.marginBottom = "60px";
    }, 200);
  };

if (token) {editPage()}; //appel de la fonction editPage si l'admin est connecté

/**
 * FONCTION QUI CREEE LES ELEMENTS D'UN PROJET DANS LA GALERIE
 * @param {*} work 
 */
function addPicture(work) {
  
  const newFigure = document.createElement("figure");
  newFigure.setAttribute("data-id", work.id);

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

  document.getElementsByClassName("js-galery")[0].appendChild(newFigure);
}

const main = document.getElementsByTagName("main");
const editWorks = document.getElementsByClassName("modify-works");
let modalGenerated = false;

/**
 * CREE LE BACKGROUND EN AJOUTANT DES ELEMENTS AU DOM
 */
function createBackground() {
  let background = document.createElement("div");
  background.className = "js-modal-background";
  main[0].appendChild(background);
}
/**
 * CREE LA MODALE EN AJOUTANT DES ELEMENTS AU DOM
 */
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
  jsGalery.className = "js-galery";
  fetch("http://localhost:5678/api/works")
    .then((res) => res.json())
    .then((works) => {
      for (work of works) {
        addPicture(work);
      }
    });

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

  main[0].appendChild(aside);
}

/**
 * SI ON CLIQUE SUR MODIFIER LES PROJETS
 */
document.addEventListener("click", function (event) {
  if (event.target.matches(".modify-works")) {
    // si la modale existe 
    if (modalGenerated) {
      modal[0].style.display = "block";// on la fait réapparaître
      outOfModal[0].style.display = "block";

      // si la modale (et le background) n'existent pas encore on les créée
    } else if (!modalGenerated) {
      createBackground();
      createModal();
      // la modale est générée donc on retourne true pour ne pas multiplier la modale dans le code source
      modalGenerated = true;
    }
  }
});

const modal = document.getElementsByClassName("js-modal");
const outOfModal = document.getElementsByClassName("js-modal-background");
const modalPicture = document.getElementsByClassName("js-modal-picture");

/**
 * FONCTION QUI FERME LA PREMIERE MODALE ET LE BACKGROUND
 */
function closeModal() {
  modal[0].style.display = "none";
  outOfModal[0].style.display = "none";
}

/**
 * FERME LA MODALE EN CLIQUANT SUR LA CROIX
 */
document.addEventListener("click", function (event) {
  if (event.target.matches(".fa-xmark")) {
    closeModal();
  }
});
/**
 * FERME LA MODALE PICTURE EN CLIQUANT SUR LA CROIX
 */
document.addEventListener("click", function (event) {
  if (event.target.matches(".close-modale-picture")) {
    closeModal();
    modalPicture[0].style.display = "none";
  }
});
/**
 * FERME LA MODALE EN CLIQUANT EN DEHORS DE LA MODALE VIA LE BACKGROUND GRIS
 */
document.addEventListener("click", function (event) {
  if (event.target.matches(".js-modal-background")) {
    if (modal[0].style.display != "none") {
      closeModal();
    } else {
      modalPicture[0].style.display = "none";
      closeModal();
    }
  }
});
/**
 * SUPPRESSION D'UN TRAVAIL DE L'ARCHITECTE EN CLIQUANT SUR LA POUBELLE LIEE A UN PROJET
 */
document.addEventListener("click", function (event) {
  const trashbins = document.getElementsByClassName("fa-trash-can");
  for (let trashbin of trashbins) {
    if (event.target === trashbin) {
      const confirmDeletion = confirm("Voulez-vous vraiment supprimer ce projet ?");
      if (confirmDeletion) {
        fetch("http://localhost:5678/api/works/" + trashbin.dataset.id, {
          method: "DELETE",
          headers: {
            Authorization: "Bearer " + token,
          },
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Erreur lors de la suppression du projet");
            }
            // Suppression du projet dans le DOM si la réponse est "OK"
            document
              .querySelector(`[data-id="${trashbin.dataset.id}"`)
              .remove();
            trashbin.parentElement.remove();
            const jsGalery = document.getElementsByClassName("js-galery");
            if (!jsGalery[0].firstChild) {
              document.getElementsByClassName(
                "fa-arrows-up-down-left-right"
              )[0].style.display = "none";
            }
          })
          .catch((error) => {
            // Traitement de l'erreur
            console.error(error);
          });
      }
    }
  }
});
/**
 * CREATION DE LA MODALE AJOUTER PROJET EN MANIPULANT LE DOM
 */
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
    `<form id ="form-modal" enctype="multipart/form-data" method="post" name="sendwork">
      <div id="file-label">
        <label for="form-img">
          <i class="fa-regular fa-image"></i>
          <div id="button-label">+ Ajouter photo</div>
          <p>jpg, png : 4mo max</p>
          <input type="file" name="workimage" id="form-img" class="input-file" accept=".png, .jpg" max="4000000" required /><br />
        </label>
      </div>
      <img id="preview" src="#" ">
      <label>Titre</label><br />
      <input type="text" name="worktitle" required id="form-title"/><br />
      <label>Catégorie</label><br />
      <select name="workcategory" id="form-category" required>
          <option value=""></option>
          <option value="1">Objets</option>
          <option value="2">Appartements</option>
          <option value="3">Hotels & restaurants</option>
        </select>
    </form>`
  );
  aside.appendChild(modalDivNewPicture);
  

  let divButtonValider = document.createElement("div");
  divButtonValider.className = "button-valider";

  let button = document.createElement("button");
  button.textContent = "Valider";
  button.className = "submit-work grey-button";
  button.id = "submit-work";

  divButtonValider.appendChild(button);
  aside.appendChild(divButtonValider);

  main[0].appendChild(aside);
};
let modalPictureGenerated = false;
/**
 * SI ON CLIQUE SUR LE BOUTON AJOUTER UNE PHOTO ON CREE LA MODALE PROJET OU ON LA REOUVRE
 */
document.addEventListener("click", function (event) {
  if (event.target.matches("#addPicture")) {
    modal[0].style.display = "none"; // ferme la modale car on fait apparaître la modale picture
    if (modalPictureGenerated) {
      modalPicture[0].style.display = "block"; //on refait apparaître la modale picture si elle existe déjà
    } else if (!modalPictureGenerated) {
      //si la modale n'existe pas on appelle la fonction createModalPicture
      createModalPicture();
      // la modale est générée donc on retoune true pour ne pas multiplier la modale picture dans le code source
      modalPictureGenerated = true;
    }
  }
});
/**
 * RETOURNE SUR L'ANCIENNE MODALE SI ON CLIQUE SUR PRECEDENT
 */
document.addEventListener("click", function (event) {
  if (event.target.matches(".fa-arrow-left")) {
    modalPicture[0].style.display = "none";
    modal[0].style.display = "block";
  }
});
/**
 * ENVOYER UN NOUVEAU PROJET
 */
function sendWork() {
  const workimage = document.getElementById("form-img");
  const worktitle = document.getElementById("form-title");
  const workcategory = document.getElementById("form-category");
  const data = new FormData();
  data.append("image", workimage.files[0]);
  data.append("title", worktitle.value);
  data.append("category", workcategory.value);

  fetch("http://localhost:5678/api/works", {
    method: "POST",
    headers: {
      Authorization: "Bearer " + token,
    },
    body: data,
  })
    .then((res) => {
      if (res.ok) {
        alert("Code 201: Created");
        return res.json();
      } else {
        throw new Error(res.statusText);
      }
    })
    .then((data) => {
      console.log(data);
      // Traitement des données renvoyées par l'API
      addNewWork(); //ajoute le projet dans la galerie
      modalPicture[0].style.display = "none"; //passe sur la première modale pour voir le projet s'ajouter
      modal[0].style.display = "block";
      addNewElement(); //ajoute le projet dans la liste d'image de la modale
      document.getElementsByClassName("fa-arrows-up-down-left-right")[0].style.display = "block"; // refait apparaître les flèches si on ajoute un projet, au cas où tous les projets avaient été supprimés
    })
    .catch((error) => {
      alert(error);
    });
};
/**
 * FONCTION QUI PERMET D'AJOUTER LE DERNIER PROJET DANS LA GALERIE
 */
function addNewWork() {
  fetch("http://localhost:5678/api/works")
    .then((res) => res.json())
    .then((works) => {
      const work = works[works.length - 1];
      if (work) {
        addWork(work);
      }
    });
};
/**
 * FONCTION QUI PERMET DAJOUTER LE DERNIER PROJET DANS LA GALERIE DE LA MODALE
 */
function addNewElement() {
  fetch("http://localhost:5678/api/works")
    .then((res) => res.json())
    .then((works) => {
      const work = works[works.length - 1];
      if (work) {
        addPicture(work);
      }
    });
}

let formIsValid = false;
/**
 * FONCTION QUI CHANGE LA COULEUR DU BOUTON VALIDER QUAND LES CHAMPS DU FORMULAIRE SONT REMPLIS
 */
function checkForm() {
  const workimage = document.getElementById("form-img");
  const worktitle = document.getElementById("form-title");
  const workcategory = document.getElementById("form-category");
  const button = document.getElementById("submit-work");
  if (
    workimage.files.length != 0 && //si TOUS les champs ne contiennent pas du vide
    worktitle.value != "" &&
    workcategory.value != ""
  ) {
    button.style.backgroundColor = "#1D6154"; //le bouton devient vert
    formIsValid = true;
  } else {
    button.style.backgroundColor = "#A7A7A7"; // le bouton reste gris
    formIsValid= false;
  }
}
/**
 * QUAND CHAQUE CHAMP DU FORMULAIRE EST REMPLI LE BOUTON VALIDER DEVIENT VERT
 */
document.addEventListener("click", function (event) {
  if (event.target.matches("#addPicture")) {
    //appelle la fonction qui change la couleur du bouton dès qu'un changement est detecté dans chaque champ
    document.getElementById("form-img").addEventListener("change", checkForm); 
    document.getElementById("form-title").addEventListener("change", checkForm);
    document.getElementById("form-category").addEventListener("change", checkForm);
  }
});
/**
 * QUAND ON CLIQUE SUR VALIDER ON VERIFIE QUE LE FORMULAIRE EST REMPLI PUIS ON APPELLE LA FONCTION SENDWORK POUR AJOUTER LE NOUVEAU PROJET
 */
document.addEventListener("click", function (event) {
  if (event.target.matches("#submit-work")) {
    if (!formIsValid) {
      // on vérifie que tous les champs soient remplis
      alert("Veuillez remplir tous les champs du formulaire");
      return;
    }
    sendWork(); //on appelle la fonction qui envoie le projet à l'api
    event.stopPropagation();
    event.preventDefault();
  }
});
/**
 * VERIFIE LE FORMAT DE LA PHOTO ENVOYEE ET L'AFFICHE DANS LE FORMULAIRE
 */
document.addEventListener("click", function (event) {
  if (event.target.matches("#addPicture")) {
    const input = document.getElementById("form-img");
    const preview = document.getElementById("preview");
    const maxSize = 4000000; // 4 Mo en octets
    input.addEventListener("change", () => {
      // Récupère le fichier sélectionné
      const file = input.files[0];
      // Vérifie que le fichier est une image png OU jpg OU jpeg ET de moins de 4 mo
      if (
        ( file.type.startsWith("image/png") ||
          file.type.startsWith("image/jpeg") ||
          file.type.startsWith("image/jpg")) &&
        file.size < maxSize
      ) {
        // Crée un lecteur de fichier pour lire l'image sélectionnée
        const reader = new FileReader();

        // Définit un gestionnaire d'événements pour l'événement "load" du lecteur de fichier
        reader.addEventListener("load", () => {
          // Affiche l'image dans l'élément img et le fait apparaître
          preview.src = reader.result;
          preview.style.display = "block";
          document.getElementById("button-label").style.display ="none";
        });
        reader.readAsDataURL(file);
      } else {
        preview.src = "#";
        alert("Veuillez sélectionner une image valide.");
        document.getElementById("button-label").style.display ="block";
        preview.style.display = "none";
        const form = document.getElementById("form-modal");
        form.reset();
      }
    });
  }
});
