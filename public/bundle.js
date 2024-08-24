'use strict';

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

const populares$3 = document.getElementById("populares");
const media = document.getElementById("media");

populares$3.querySelector(".main__grid").addEventListener("click", async (e) => {
  if (e.target.closest("a")) {
    e.preventDefault();
    const objetivo = e.target.closest("a");
    const categoriaActiva = document.querySelector(".main .btn--active");

    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZGZjMzU4ZjEzZGVmYmQyMGU5YTBlNjJhNzEyZjZkZCIsIm5iZiI6MTcyNDI1ODk3MS4xNjA4MTksInN1YiI6IjY0YTk3ZTcwZDFhODkzMDExYzMyNGU0NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3One9UJRQfDWoLIyg9Bx7zUzPYQCmJ0UDUy87h2asMs",
      },
    };
    const fetchObjectPeliculas = await fetch(
      `https://api.themoviedb.org/3/${categoriaActiva.id}/${
        objetivo.closest(".main__media").dataset.id
      }?language=en-US`,
      options
    );
    const filmJson = await fetchObjectPeliculas.json();
    const filmActivo = document.querySelector(".main .btn--active").id;

    media.classList.add("media--active");

    media.querySelector(
      ".media__backdrop-image"
    ).src = `https://image.tmdb.org/t/p/w500//${filmJson["backdrop_path"]}`;

    media.querySelector(
      ".media__poster"
    ).src = `https://image.tmdb.org/t/p/w500//${filmJson["poster_path"]}`;

    media.querySelector(".media__titulo").innerHTML =
      filmActivo === "movie" ? filmJson.title : filmJson.name;

    media.querySelector(".media__fecha").innerHTML =
      filmActivo === "movie"
        ? filmJson["release_date"]
        : filmJson["first_air_date"];

    media.querySelector(".media__overview").innerHTML = filmJson.overview;
  }
});

media.querySelector(".media__btn").addEventListener("click", (e) => {
  if (e.target.closest("button")) {
    media.classList.remove("media--active");
  }
});

const cargarFiltros = async () => {
  const filmActivo = document.querySelector(".main .btn--active").id;
  const contenedorGeneros = document.getElementById("filtro-generos");
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZGZjMzU4ZjEzZGVmYmQyMGU5YTBlNjJhNzEyZjZkZCIsIm5iZiI6MTcyNDM0ODY2My4zNDU2MTMsInN1YiI6IjY0YTk3ZTcwZDFhODkzMDExYzMyNGU0NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.P1J0aoju-kBOR7IrAJ52pBCGNnoEVJEq-avOW3WEN8M",
    },
  };

  if (filmActivo === "movie") {
    contenedorGeneros.innerHTML = "";
    const url = "https://api.themoviedb.org/3/genre/movie/list?language=en";
    const respuestaFetch = await fetch(url, options);
    const datos = await respuestaFetch.json();
    const objetoJson = await datos.genres;
    objetoJson.forEach((genero) => {
      contenedorGeneros.innerHTML += `<button class="btn" data-id="${genero.id}">${genero.name}</button>`;
    });
  } else {
    contenedorGeneros.innerHTML = "";
    const url = "https://api.themoviedb.org/3/genre/tv/list?language=en";
    const respuestaFetch = await fetch(url, options);
    const datos = await respuestaFetch.json();
    const objetoJson = await datos.genres;
    objetoJson.forEach((genero) => {
      contenedorGeneros.innerHTML += `<button class="btn" data-id="${genero.id}">${genero.name}</button>`;
    });
  }
};

const contenedorGeneros$2 = document.getElementById("filtro-generos");
const populares$2 = document.getElementById("populares");

contenedorGeneros$2.addEventListener("click", (e) => {
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
  contenedorGeneros$2.dataset.activo = true;
  if (generoActivo && anyoMax && anyoMin) {
    fetchPopularesFiltrados(
      film,
      generoActivo,
      anyoMin,
      anyoMax,
      populares$2.dataset.page
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
  populares$2.querySelector(".main__grid").innerHTML = "";
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

    populares$2.querySelector(".main__grid").append(divPelicula);
  });
};

const btnAnterior = document.getElementById("pagina-anterior");
const btnSiguiente = document.getElementById("pagina-siguiente");
const populares$1 = document.getElementById("populares");
const contenedorGeneros$1 = document.getElementById("filtro-generos");

btnSiguiente.addEventListener("click", (e) => {
  const generoActivo = document.querySelector("#filtro-generos .btn--active")
    ?.dataset.id;
  const anyoMin = document.getElementById("años-min").value;
  const anyoMax = document.getElementById("años-max").value;
  const filmActivo = document.querySelector(".main .btn--active").id;
  populares$1.dataset.pagina = parseInt(populares$1.dataset.pagina) + 1;
  if (contenedorGeneros$1.dataset.activo == "true") {
    fetchPopularesFiltrados(
      filmActivo,
      generoActivo,
      anyoMin,
      anyoMax,
      populares$1.dataset.pagina
    );
    console.log("hola");
  } else {
    fetchPopulares(filmActivo, populares$1.dataset.pagina);
  }
});

btnAnterior.addEventListener("click", (e) => {
  const generoActivo = document.querySelector("#filtro-generos .btn--active")
    ?.dataset.id;
  const anyoMin = document.getElementById("años-min").value;
  const anyoMax = document.getElementById("años-max").value;
  const filmActivo = document.querySelector(".main .btn--active").id;
  if (populares$1.dataset.pagina > 1) {
    populares$1.dataset.pagina = parseInt(populares$1.dataset.pagina) - 1;
  }

  if (contenedorGeneros$1.dataset.activo == "true") {
    console.log("hola");
    fetchPopularesFiltrados(
      filmActivo,
      generoActivo,
      anyoMin,
      anyoMax,
      populares$1.dataset.pagina
    );
  } else {
    fetchPopulares(filmActivo, populares$1.dataset.pagina);
  }
});

const btnMovie = document.getElementById("movie");
const btnTv = document.getElementById("tv");
const populares = document.getElementById("populares");
const contenedorGeneros = document.getElementById("filtro-generos");

btnMovie.addEventListener("click", () => {
  const btnActivo = document.querySelector(".main .btn--active");

  if (!btnMovie.classList.contains("btn--active")) {
    populares.dataset.pagina = 1;
    btnActivo.classList.remove("btn--active");
    btnMovie.classList.add("btn--active");

    cargarFiltros();
    fetchPopulares("movie", populares.dataset.pagina);
    contenedorGeneros.dataset.activo = false;
  }
});

btnTv.addEventListener("click", () => {
  const btnActivo = document.querySelector(".main .btn--active");
  if (!btnTv.classList.contains("btn--active")) {
    populares.dataset.pagina = 1;
    btnActivo.classList.remove("btn--active");
    btnTv.classList.add("btn--active");
    cargarFiltros();
    fetchPopulares("tv", populares.dataset.pagina);
    contenedorGeneros.dataset.activo = false;
  }
});

fetchPopulares();
cargarFiltros();

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZGZjMzU4ZjEzZGVmYmQyMGU5YTBlNjJhNzEyZjZkZCIsIm5iZiI6MTcyNDQ0MDQwOS4xMDQ3NjYsInN1YiI6IjY0YTk3ZTcwZDFhODkzMDExYzMyNGU0NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UBsPv-6jWi9qXL_0VX9bY3i8As7D9X4eN6ahAzVATUY",
  },
};

fetch(
  "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&primary_release_date.gte=2020&primary_release_date.lte=2024&sort_by=popularity.desc&with_genres=11",
  options
)
  .then((response) => response.json())
  .then((response) => console.log(response))
  .catch((err) => console.error(err));
//# sourceMappingURL=bundle.js.map
