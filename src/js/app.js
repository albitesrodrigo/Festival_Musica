document.addEventListener("DOMContentLoaded", function () {
  // espera a que el documento esté listo

  navegacionFija();
  crearGaleria();
  resaltarEnlace();
  scrollNavigation();
});

function navegacionFija() {
  const header = document.querySelector(".header");
  const sobreFestival = document.querySelector(".sobre-festival");

  document.addEventListener("scroll", function () {
    if (sobreFestival.getBoundingClientRect().bottom < 1) {
      header.classList.add("fixed");
    } else {
      header.classList.remove("fixed");
    }
  });
}

function crearGaleria() {
  const countImages = 16;
  const galeria = document.querySelector(".galeria-imagenes");

  for (let i = 1; i <= countImages; i++) {
    const imagen = document.createElement("PICTURE");
    imagen.innerHTML = `
        <source srcset="build/img/gallery/thumb/${i}.avif" type="image/avif">
        <source srcset="build/img/gallery/thumb/${i}.webp" type="image/webp">
        <img loading="lazy" width="200" height="300" src="build/img/gallery/thumb/${i}.jpg" alt="imagen galeria">
    `;

    // Event Handler
    imagen.onclick = function () {
      mostrartImagen(i);
    };

    galeria.appendChild(imagen);
  }
}

function mostrartImagen(i) {
  const imagen = document.createElement("PICTURE");
  imagen.innerHTML = `
    <source srcset="build/img/gallery/full/${i}.avif" type="image/avif">
    <source srcset="build/img/gallery/full/${i}.webp" type="image/webp">
    <img loading="lazy" width="200" height="300" src="build/img/gallery/full/${i}.jpg" alt="imagen galeria">
  `;

  // Generar Modal
  const modal = document.createElement("DIV"); // creamos un div
  modal.classList.add("modal"); // le agregamos una clase
  modal.onclick = cerrarModal; // le agregamos un evento
  modal.appendChild(imagen); // agregamos la imagen al modal

  // Boton cerrar modal
  const btnCerrar = document.createElement("BUTTON"); // creamos un boton
  btnCerrar.textContent = "X"; // le agregamos un texto
  btnCerrar.classList.add("btn-cerrar"); // le agregamos una clase
  btnCerrar.onclick = cerrarModal; // le agregamos un evento
  modal.appendChild(btnCerrar); // lo agregamos al modal

  // Agregar al HTML
  const body = document.querySelector("body");
  body.classList.add("overflow-hidden");
  body.appendChild(modal); // agreagamos el modal al body
}

function cerrarModal() {
  const modal = document.querySelector(".modal");
  modal.classList.add("fade-out");
  setTimeout(() => {
    modal?.remove();

    const body = document.querySelector("body");
    body?.classList?.remove("overflow-hidden");
  }, 500);
}

function resaltarEnlace() {
  document.addEventListener("scroll", function () {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".navegacion-principal a");

    let actual = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (window.scrollY >= sectionTop - sectionHeight / 3) {
        actual = section.id;
      }
    });
    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === "#" + actual) {
        link.classList.add("active");
      }
    });
  });
}

function scrollNavigation() {
  const navLinks = document.querySelectorAll(".navegacion-principal a");

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const sectionScroll = e.target.getAttribute("href");
      const section = document.querySelector(sectionScroll);

      section.scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}
