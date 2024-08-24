import cargarFiltros from "./cargarFiltros";
import fetchPopulares from "./fetchPopulares";

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
