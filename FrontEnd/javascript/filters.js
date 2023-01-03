// on veut créer les filtres sous forme de li, en se servant de l'api categories
fetch("http://localhost:5678/api/categories")
  .then((res) => res.json())
  .then((categories) => {
    const filters = document.createElement("ul");
    filters.id = "ulfilters";
    const sibling = document.getElementsByClassName("gallery");
    let parent = document.getElementById("portfolio");
    parent.appendChild(filters);
    parent.insertBefore(filters, sibling[0]);
    let tousLi = document.createElement("li");
    tousLi.textContent = "Tous";
    filters.appendChild(tousLi);

    for (category of categories) {
      let newLi = document.createElement("li");
      newLi.textContent = category.name;
      filters.appendChild(newLi);
    }
  });

//on veut maintenant rendre ces filtres fonctionnels donc on change d'api pour récupérer le backend des projets
fetch("http://localhost:5678/api/works")
  .then((res) => res.json())
  .then((works) => {
    const gallery = document.getElementsByClassName("gallery");
    let newLi = document.querySelectorAll("#portfolio li");

    for (let i = 0; i < newLi.length; i++) {
      newLi[i].addEventListener("click", function () {
        // on réinitialise tous les boutons avant de mettre à jour la couleur du bouton actif
        for (let j = 0; j < newLi.length; j++) {
          newLi[j].style.backgroundColor = "";
          newLi[j].style.color = "";
        }
        // on met à jour la couleur du bouton actif
        newLi[i].style.backgroundColor = "#1D6154";
        newLi[i].style.color = "white";

        while (gallery[0].firstChild) {
          gallery[0].removeChild(gallery[0].firstChild); //supprime chaque figure de la galerie dès que l'on clique sur un filtre
        }
        for (work of works) {
          //on ajoute uniquement au HTML les projets qui ont la bonne catégorie OU tous les projets si on clique sur TOUS
          if (
            work.category.name === newLi[i].textContent ||
            newLi[i].textContent === "Tous"
          ) {
            addWork(work);
          }
        }
      });
    }
  });
