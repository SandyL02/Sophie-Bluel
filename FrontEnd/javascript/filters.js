/**
 * CREE LES FILTRES SOUS FORME DE LI EN SE SERVANT DE L'API CATEGORIES
 */
function createCategoryFilters() {
  // Appeler l'API de catégories
  fetch("http://localhost:5678/api/categories")
    .then((response) => response.json())
    .then((categories) => {
      // Créer la liste de filtres de catégorie
      const categoryFilterList = document.createElement("ul");
      categoryFilterList.id = "ulfilters";

      // Obtenir l'élément parent et le sibling
      const sibling = document.getElementsByClassName("gallery");
      const parent = document.getElementById("portfolio");

      // Ajouter la liste de filtres au DOM
      parent.appendChild(categoryFilterList);
      parent.insertBefore(categoryFilterList, sibling[0]);

      // Créer un bouton de filtre "Tous"
      const allFilterButton = document.createElement("li");
      allFilterButton.textContent = "Tous";
      categoryFilterList.appendChild(allFilterButton);

      // Créer un bouton de filtre pour chaque catégorie
      for (let category of categories) {
        const categoryFilterButton = document.createElement("li");
        categoryFilterButton.textContent = category.name;
        categoryFilterList.appendChild(categoryFilterButton);
      }
    });
}
createCategoryFilters();

//on veut maintenant rendre ces filtres fonctionnels donc on change d'api pour récupérer le backend des projets
fetch("http://localhost:5678/api/works")
  .then((res) => res.json())
  .then((works) => {
    // Obtenir les boutons de filtre et la galerie
    const filterButtons = document.querySelectorAll("#portfolio li");
    const gallery = document.getElementsByClassName("gallery");

    // Ajouter un gestionnaire d'événements à chaque bouton de filtre
    for (let i = 0; i < filterButtons.length; i++) {
      filterButtons[i].addEventListener("click", function () {
        // Réinitialiser tous les boutons avant de mettre à jour la couleur du bouton actif
        for (let j = 0; j < filterButtons.length; j++) {
          filterButtons[j].style.backgroundColor = "";
          filterButtons[j].style.color = "";
        }
        // Mettre à jour la couleur du bouton actif
        filterButtons[i].style.backgroundColor = "#1D6154";
        filterButtons[i].style.color = "white";

        // Supprimer les figures de la galerie
        while (gallery[0].firstChild) {
          gallery[0].removeChild(gallery[0].firstChild);
        }

        // Ajouter les projets filtrés à la galerie
        for (work of works) {
          if (
            work.category.name === filterButtons[i].textContent ||
            filterButtons[i].textContent === "Tous"
          ) {
            addWork(work);
          }
        }
      });
    }
  });
