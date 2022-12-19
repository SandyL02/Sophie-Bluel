fetch("http://localhost:5678/api/works")
  .then((res) => res.json())
  .then((works) => {
    const gallery = document.getElementsByClassName("gallery");
    for (work of works) {
      let newFigure = document.createElement("figure");
      //ne pas oublier le [0] car il s'agit d'une classe et il faut donc sélectionner quelque chose
      gallery[0].appendChild(newFigure);

      newFigure.innerHTML = `<img crossorigin="anonymous" src=${work.imageUrl} alt="${work.title}">
            <figcaption>${work.title}</figcaption>`;
    }
  });
