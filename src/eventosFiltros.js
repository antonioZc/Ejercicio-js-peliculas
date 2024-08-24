const contenedorGeneros = document.getElementById("filtro-generos");
const populares = document.getElementById("populares");

contenedorGeneros.addEventListener("click", (e) => {
  let generoActivo = document.querySelector("#filtro-generos .btn--active");

  if (e.target.closest("button")) {
    if (generoActivo) {
      generoActivo.classList.remove("btn--active");
    }
    const generoSeleccionado = e.target.closest("button");
    if (!generoSeleccionado.classList.contains("btn--active")) {
      generoSeleccionado.classList.add("btn--active");
    }
  }
});

const btnBuscar = document.getElementById("btn-buscar");

btnBuscar.addEventListener("click", () => {
  const film = document.querySelector(".main .btn--active").id;
  const generoActivo = document.querySelector("#filtro-generos .btn--active")
    ?.dataset.id;
  const anyoMin = document.getElementById("años-min").value;
  const anyoMax = document.getElementById("años-max").value;
  contenedorGeneros.dataset.activo = true;
  if (generoActivo && anyoMax && anyoMin) {
    fetchPopularesFiltrados(
      film,
      generoActivo,
      anyoMin,
      anyoMax,
      populares.dataset.page
    );
  }
});

const fetchPopularesFiltrados = async (
  film = "movie",
  genero = "",
  anyoMin = "",
  anyoMax = "",
  page = 1
) => {
  populares.querySelector(".main__grid").innerHTML = "";
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZGZjMzU4ZjEzZGVmYmQyMGU5YTBlNjJhNzEyZjZkZCIsIm5iZiI6MTcyNDQ0MDQwOS4xMDQ3NjYsInN1YiI6IjY0YTk3ZTcwZDFhODkzMDExYzMyNGU0NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UBsPv-6jWi9qXL_0VX9bY3i8As7D9X4eN6ahAzVATUY",
    },
  };

  const fetchFiltrados = await fetch(
    `https://api.themoviedb.org/3/discover/${film}?language=en-US&page=${page}&release_date.gte=${
      anyoMin + "-01-01"
    }&release_date.lte=${
      anyoMax + "-12-31"
    }&sort_by=popularity.desc&with_genres=${genero}`,
    options
  );

  const datos = await fetchFiltrados.json();
  const films = datos.results;

  films.forEach((film2) => {
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

    populares.querySelector(".main__grid").append(divPelicula);
  });
};

export default fetchPopularesFiltrados;
