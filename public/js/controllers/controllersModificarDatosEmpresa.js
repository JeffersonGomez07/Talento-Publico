"use strict";

let idUsuario = sessionStorage.getItem("Usuario ID");

const btnActualizar = document.getElementById("btnSubmit");
const btnVolver = document.getElementById("btnCancel");
const txtNombreEmpresa = document.getElementById("txtNombreEmpresa");
const txtCorreo = document.getElementById("txtCorreo");
const inputFoto = document.getElementById("fotoUsuario");
let _id;

const llenar_campos = async () => {
  let empresa = await obtener_empresa_por_id(idUsuario);

  if (empresa) {
    _id = empresa._id;
    txtNombreEmpresa.value = empresa.nombre;
    txtCorreo.value = empresa.correo;
    if (empresa.fotoPerfil === "" || inputFoto.src === "./img/ImgFondoBlanco.png") {
      inputFoto.src = "./img/ImgFondoBlanco.png";
    } else {
      inputFoto.src = empresa.fotoPerfil;
    }

  }
};

function validar_campos_vacios() {
  let error = false;
  let camposRequeridos = document.querySelectorAll(
    "#formRegistroEmpresa [required]"
  );
  for (let i = 0; i < camposRequeridos.length; i++) {
    if (camposRequeridos[i].value === "") {
      camposRequeridos[i].classList.add("error");
      error = true;
    } else {
      camposRequeridos[i].classList.remove("error");
    }
  }
  return error;
}

function validar_nombre() {
  let error = false;
  let texto = txtNombreEmpresa.value;
  let regex = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/;

  if (regex.test(texto) === false) {
    txtNombreEmpresa.classList.add("error");
    error = true;
  } else {
    txtNombreEmpresa.classList.remove("error");
  }
  return error;
}

function validar_correo() {
  let error = false;
  let texto = txtCorreo.value;
  let regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (regex.test(texto) === false) {
    txtCorreo.classList.add("error");
    error = true;
  } else {
    txtCorreo.classList.remove("error");
  }
  return error;
}

function limpiar_datos() {
  txtNombreEmpresa.value = "";
  txtCorreo.value = "";
  // No es necesario limpiar el valor de la imagen aquí
}

function mostrar_alerta_exitosa(mensaje) {
  Swal.fire({
    icon: "success",
    title: "¡Empresa modificada!",
    text: mensaje,
    showConfirmButton: false,
    timer: 2000,
  });
}

function enviar_datos(event) {
  event.preventDefault();
  let error_campos_vacios = validar_campos_vacios();
  let error_validar_nombre = validar_nombre();
  let error_validar_correo = validar_correo();

  if (error_campos_vacios) {
    Swal.fire({
      icon: "warning",
      title: "Se encontraron campos vacíos",
      text: "Por favor completa los campos señalados",
    });
  } else if (error_validar_nombre) {
    Swal.fire({
      icon: "warning",
      title: "Nombre inválido",
      text: "El nombre de la empresa solo debe contener letras.",
    });
  } else if (error_validar_correo) {
    Swal.fire({
      icon: "warning",
      title: "Correo inválido",
      text: "El campo correo debe seguir el siguiente formato: usuario@email.com",
    });
  } else {
    let nombreEmpresa = txtNombreEmpresa.value;
    let correoEmpresa = txtCorreo.value;
    let foto = inputFoto.src;

    modificar_empresa(_id, nombreEmpresa, correoEmpresa, foto);

    mostrar_alerta_exitosa("Has modificado los datos de la empresa con éxito!");
    limpiar_datos();
  }
}

function cancelar_datos() {
  window.location.href = "modificar-empresa.html";
  limpiar_datos();
}

btnActualizar.addEventListener("click", enviar_datos);
btnVolver.addEventListener("click", cancelar_datos);

llenar_campos();
