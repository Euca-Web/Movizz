// Exemple de films pour chaque page
const filmsAZ = [
    { title: "Avengers: Endgame", poster: "https://via.placeholder.com/200x300?text=Avengers", genre: "Action" },
    { title: "Inception", poster: "https://via.placeholder.com/200x300?text=Inception", genre: "Sci-Fi" },
    { title: "Titanic", poster: "https://via.placeholder.com/200x300?text=Titanic", genre: "Romance" },
    // Ajoutez plus de films ici...
  ];
  
  const latestFilms = [
    { title: "Furiosa", poster: "https://via.placeholder.com/200x300?text=Furiosa", genre: "Action" },
    { title: "The Marvels", poster: "https://via.placeholder.com/200x300?text=The+Marvels", genre: "Sci-Fi" },
    { title: "Equalizer 3", poster: "https://via.placeholder.com/200x300?text=Equalizer+3", genre: "Thriller" },
    // Ajoutez plus de films ici...
  ];
  
  const compactFilms = [
    { title: "The Batman", genre: "Action" },
    { title: "Sniper: Rogue Mission", genre: "Action" },
    { title: "Morbius", genre: "Action" },
    // Ajoutez plus de films ici...
  ];
  
  // Fonction pour afficher les films populaires (page principale)
  function displayPopularFilms() {
    const filmList = document.getElementById("film-list");
    filmList.innerHTML = "";
    filmsAZ.forEach(film => {
      const filmElement = document.createElement("div");
      filmElement.classList.add("film");
      filmElement.innerHTML = `
        <img src="${film.poster}" alt="${film.title}">
        <h3>${film.title}</h3>
        <p>${film.genre}</p>
      `;
      filmList.appendChild(filmElement);
    });
  }
  
  // Fonction pour afficher les films de A à Z
  function displayFilmsAZ() {
    const filmContainer = document.getElementById("film-container");
    filmContainer.innerHTML = "";
    filmsAZ.sort((a, b) => a.title.localeCompare(b.title)); // Tri alphabétique
    filmsAZ.forEach(film => {
      const filmElement = document.createElement("div");
      filmElement.classList.add("film");
      filmElement.innerHTML = `
        <img src="${film.poster}" alt="${film.title}">
        <h3>${film.title}</h3>
        <p>${film.genre}</p>
      `;
      filmContainer.appendChild(filmElement);
    });
  }
  
  // Fonction pour afficher les dernières sorties
  function displayLatestFilms() {
    const filmContainer = document.getElementById("latest-films");
    filmContainer.innerHTML = "";
    latestFilms.forEach(film => {
      const filmElement = document.createElement("div");
      filmElement.classList.add("film");
      filmElement.innerHTML = `
        <img src="${film.poster}" alt="${film.title}">
        <h3>${film.title}</h3>
        <p>${film.genre}</p>
      `;
      filmContainer.appendChild(filmElement);
    });
  }
  
  // Fonction pour afficher les films en vue compacte
  function displayCompactView() {
    const compactView = document.getElementById("compact-view");
    compactView.innerHTML = "";
    compactFilms.forEach(film => {
      const filmElement = document.createElement("li");
      filmElement.classList.add("film-item");
      filmElement.innerHTML = `
        <strong>${film.title}</strong> - ${film.genre}
      `;
      compactView.appendChild(filmElement);
    });
  }
  
  // Initialisation de l'affichage sur chaque page
  if (document.getElementById("film-list")) {
    displayPopularFilms(); // Page principale
  }
  
  if (document.getElementById("film-container")) {
    displayFilmsAZ(); // Page "Tous les films de A à Z"
  }
  
  if (document.getElementById("latest-films")) {
    displayLatestFilms(); // Page "Dernières sorties"
  }
  
  if (document.getElementById("compact-view")) {
    displayCompactView(); // Page "Films en vue compacte"
  }
  