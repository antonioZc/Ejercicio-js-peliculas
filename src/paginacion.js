import fetchPopularesFiltrados from "./eventosFiltros";
import fetchPopulares from "./fetchPopulares";

const btnAnterior = document.getElementById("pagina-anterior");
const btnSiguiente = document.getElementById("pagina-siguiente");
const populares = document.getElementById("populares");
const contenedorGeneros = document.getElementById("filtro-generos");

btnSiguiente.addEventListener("click", (e) => {
  const generoActivo = document.querySelector("#filtro-generos .btn--active")
    ?.dataset.id;
  const anyoMin = document.getElementById("años-min").value;
  const anyoMax = document.getElementById("años-max").value;
  const filmActivo = document.querySelector(".main .btn--active").id;
  populares.dataset.pagina = parseInt(populares.dataset.pagina) + 1;
  if (contenedorGeneros.dataset.activo == "true") {
    fetchPopularesFiltrados(
      filmActivo,
      generoActivo,
      anyoMin,
      anyoMax,
      populares.dataset.pagina
    );
    console.log("hola");
  } else {
    fetchPopulares(filmActivo, populares.dataset.pagina);
  }
});

btnAnterior.addEventListener("click", (e) => {
  const generoActivo = document.querySelector("#filtro-generos .btn--active")
    ?.dataset.id;
  const anyoMin = document.getElementById("años-min").value;
  const anyoMax = document.getElementById("años-max").value;
  const filmActivo = document.querySelector(".main .btn--active").id;
  if (populares.dataset.pagina > 1) {
    populares.dataset.pagina = parseInt(populares.dataset.pagina) - 1;
  }

  if (contenedorGeneros.dataset.activo == "true") {
    console.log("hola");
    fetchPopularesFiltrados(
      filmActivo,
      generoActivo,
      anyoMin,
      anyoMax,
      populares.dataset.pagina
    );
  } else {
    fetchPopulares(filmActivo, populares.dataset.pagina);
  }
});
