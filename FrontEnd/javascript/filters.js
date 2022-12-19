// on veut créer les filtres sous forme de li, en se servant de l'api categories
fetch("http://localhost:5678/api/categories")
  .then((res) => res.json())
  .then((categories) => {
    const filters = document.createElement("ul");
    const sibling = document.getElementsByClassName("gallery");
    let parent = document.getElementById("portfolio");
    parent.appendChild(filters);
    parent.insertBefore(filters, sibling[0]);
    filters.innerHTML = "<li>Tous</li>";

    for (category of categories) {
      let newLi = document.createElement("li");
      filters.appendChild(newLi);
      newLi.innerHTML = `${category.name}`;
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
        gallery[0].innerHTML = ""; // on vide le contenu du HTML dès que l'on clique sur un filtre

        for (work of works) {
          let newFigure = document.createElement("figure");
          //on ajoute uniquement au HTML les projets qui ont la bonne catégorie OU tous les projets si on clique sur TOUS
          if (
            work.category.name === newLi[i].textContent ||
            newLi[i].textContent === "Tous"
          ) {
            gallery[0].appendChild(newFigure);
            newFigure.innerHTML = `<img crossorigin="anonymous" src=${work.imageUrl} alt="${work.title}">
                        <figcaption>${work.title}</figcaption>`;
          }
        }
      });
    }
  });
