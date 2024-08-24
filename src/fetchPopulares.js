const fetchPopulares = async (film = "movie", page = 1) => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZGZjMzU4ZjEzZGVmYmQyMGU5YTBlNjJhNzEyZjZkZCIsIm5iZiI6MTcyNDI1ODk3MS4xNjA4MTksInN1YiI6IjY0YTk3ZTcwZDFhODkzMDExYzMyNGU0NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3One9UJRQfDWoLIyg9Bx7zUzPYQCmJ0UDUy87h2asMs",
    },
  };
  const fetchObjectPeliculas = await fetch(
    `https://api.themoviedb.org/3/${film}/popular?language=en-US&page=${page}`,
    options
  );
  const datosfilms = await fetchObjectPeliculas.json();
  const filmsJson = datosfilms.results;

  const pPopulares = document.getElementById("populares");

  pPopulares.querySelector(".main__grid").innerHTML = "";

  filmsJson.forEach((film2) => {
    const divPelicula = document.createElement("div");

    divPelicula.setAttribute("class", "main__media");
    divPelicula.setAttribute("data-id", film2.id);

    const plantilla = `<a href="#" class="main__media-thumb">
								<img class="main__media-img" src="https://image.tmdb.org/t/p/w500/${
                  film2["poster_path"]
                }" alt="" />
							</a>
							<p class="main__media-titulo">${film === "movie" ? film2.title : film2.name}</p>
							<p class="main__media-fecha">${
                film === "movie"
                  ? new Date(film2["release_date"]).getFullYear()
                  : new Date(film2["first_air_date"]).getFullYear()
              }</p>`;

    divPelicula.innerHTML = plantilla;

    pPopulares.querySelector(".main__grid").append(divPelicula);
  });
};

export default fetchPopulares;
