const populares = document.getElementById("populares");
const media = document.getElementById("media");

populares.querySelector(".main__grid").addEventListener("click", async (e) => {
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
