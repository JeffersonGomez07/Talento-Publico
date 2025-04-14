const a_cerrar_sesion = document.querySelector("#aCerrarSesion");

function cerrar_sesion(event) {
  event.preventDefault();
  sessionStorage.clear();
  localStorage.clear();
  window.location.href = "landingpage-talentopublico.html";
}

a_cerrar_sesion.addEventListener("click", cerrar_sesion);
