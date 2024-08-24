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

export default cargarFiltros;
