document.addEventListener("DOMContentLoaded", function () {
  // espera a que el documento esté listo
  crearGaleria();
});

function crearGaleria() {
  const countImages = 16;
  const galeria = document.querySelector(".galeria-imagenes");

  for (let i = 1; i <= countImages; i++) {
    const imagen = document.createElement("IMG");
    imagen.src = `src/img/gallery/full/${i}.jpg`;
    imagen.alt = `Imagen ${i}`;

    galeria.appendChild(imagen);
  }
}
