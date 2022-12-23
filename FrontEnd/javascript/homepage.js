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
      imgIntroduction.insertAdjacentHTML("afterend",`<div><i class="fa-regular fa-pen-to-square"></i> modifier</div>`);
      
      let description = document.querySelector("#introduction article");
      description.insertAdjacentHTML("afterbegin",`<div><i class="fa-regular fa-pen-to-square"></i> modifier</div>`);

      let gallery = document.getElementsByClassName("gallery");
      gallery[0].insertAdjacentHTML("beforebegin",`<div><i class="fa-regular fa-pen-to-square"></i> modifier</div>`);

      let header = document.getElementsByTagName("header");
      let editMode = document.createElement("div");
      
      editMode.insertAdjacentHTML("afterbegin",`<div class= "banner"><i class="fa-regular fa-pen-to-square"></i> Mode édition <button class="button">publier les changements</button></div>`);
      header[0].insertBefore(editMode, header[0].firstChild);

      
    }
  }

  editPage();

  



  