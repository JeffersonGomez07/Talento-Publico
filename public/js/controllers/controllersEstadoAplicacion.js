"use strict";
let idAplicacion = localStorage.getItem("id_aplicacion");
let tipoUsuario = sessionStorage.getItem("Tipo de usuario");

const btnEnviar = document.getElementById("btnSubmit");
const slctEstadoAplicacion = document.getElementById("slctEstado");
let _id;

const llenar_campos = async () => {
  let aplicacion = await obtener_aplicacion_por_id(idAplicacion);

  if (aplicacion) {
    _id = aplicacion._id;
    slctEstadoAplicacion.value = aplicacion.estado;
  }
};

function enviar_datos(event) {
  event.preventDefault();

  let NuevoEstado = slctEstadoAplicacion.value;

  modificar_aplicacion(_id, NuevoEstado);
  if (tipoUsuario == "Administrador") {
    setTimeout(() => {
      window.location.href = "ver-aplicaciones.html";
    }, 2000);
  } else if (tipoUsuario == "Manager") {
    setTimeout(() => {
      window.location.href = "ver-aplicaciones-manager.html";
    }, 2000);
  } else if (tipoUsuario == "Reclutador") {
    setTimeout(() => {
      window.location.href = "ver-aplicaciones-reclutador.html";
    }, 2000);
  }
}
btnEnviar.addEventListener("click", enviar_datos);
llenar_campos();

