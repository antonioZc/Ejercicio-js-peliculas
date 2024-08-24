import fetchPopulares from "./fetchPopulares";
import eventosPopulares from "./eventosPopulares";
import cargarFiltros from "./cargarFiltros";

import paginacion from "./paginacion";
import eventosFiltros from "./eventosFiltros";
import btnTvMovies from "./btnTvMovies";
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
