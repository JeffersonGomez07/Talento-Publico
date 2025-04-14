"use strict";

let correo = localStorage.getItem("correo");

const btnPublicar = document.getElementById("btnSubmit");
const btnCancelar = document.getElementById("btnCancel");
const txtNombre = document.getElementById("txtNombre");
const txtApellido1 = document.getElementById("txtApellido1");
const txtApellido2 = document.getElementById("txtApellido2");
const slctPosition = document.getElementById("slctPosition");
const txtCorreo = document.getElementById("txtCorreo");
const slctEstado = document.getElementById("slctEstado");
let _id;

const llenar_campos = async () => {
  let empleado = await obtener_empleado_correo(correo);
  //console.log(persona);
  _id = empleado[0]._id;

  //console.log(persona[0].foto);
  txtNombre.value = empleado[0].nombre;
  txtApellido1.value = empleado[0].apellido1;
  txtApellido2.value = empleado[0].apellido2;
  slctPosition.value = empleado[0].tipoUsuario;
  txtCorreo.value = empleado[0].correo;
  slctEstado.value = empleado[0].estado;
};

function validar_campos_vacios() {
  let error = false;
  let campos_requeridos = document.querySelectorAll(
    "#formDatosEmpleado [required]"
  );
  for (let i = 0; i < campos_requeridos.length; i++) {
    if (campos_requeridos[i].value === "") {
      campos_requeridos[i].classList.add("error");
      error = true;
    } else {
      campos_requeridos[i].classList.remove("error");
    }
  }
  return error;
}

function validar_nombre() {
  let error = false;
  let texto = txtNombre.value;
  let regex = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/;
  if (!regex.test(texto)) {
    txtNombre.classList.add("error");
    error = true;
  } else {
    txtNombre.classList.remove("error");
  }
  return error;
}

function validar_apellido1() {
  let error = false;
  let texto = txtApellido1.value;
  let regex = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/;
  if (!regex.test(texto)) {
    txtApellido1.classList.add("error");
    error = true;
  } else {
    txtApellido1.classList.remove("error");
  }
  return error;
}

function validar_apellido2() {
  let error = false;
  let texto = txtApellido2.value;
  let regex = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/;
  if (!regex.test(texto)) {
    txtApellido2.classList.add("error");
    error = true;
  } else {
    txtApellido2.classList.remove("error");
  }
  return error;
}

function validar_correo() {
  let error = false;
  let texto = txtCorreo.value;
  let regex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]+$/;
  if (!regex.test(texto)) {
    txtCorreo.classList.add("error");
    error = true;
  } else {
    txtCorreo.classList.remove("error");
  }
  return error;
}

function limpiar_datos() {
  txtNombre.value = "";
  txtApellido1.value = "";
  txtApellido2.value = "";
  txtCorreo.value = "";
  document.getElementById("slctPosition").value = "null";
  document.getElementById("slctEstado").value = "null";
}

function enviar_datos() {
  let error_campos_vacios = validar_campos_vacios();
  let error_nombre = validar_nombre();
  let error_apellido1 = validar_apellido1();
  let error_apellido2 = validar_apellido2();
  let error_correo = validar_correo();

  if (error_campos_vacios) {
    Swal.fire({
      icon: "warning",
      title: "Se encontraron campos vacíos",
      text: "Por favor completa los campos señalados",
    });
  } else if (error_nombre) {
    Swal.fire({
      icon: "warning",
      title: "Nombre inválido",
      text: "El campo nombre solo puede contener letras",
    });
  } else if (error_apellido1) {
    Swal.fire({
      icon: "warning",
      title: "Apellido 1 inválido",
      text: "El campo apellido solo puede contener letras",
    });
  } else if (error_apellido2) {
    Swal.fire({
      icon: "warning",
      title: "Apellido 2 inválido",
      text: "El campo apellido solo puede contener letras",
    });
  } else if (error_correo) {
    Swal.fire({
      icon: "warning",
      title: "Correo inválido",
      text: "El campo correo debe seguir el siguiente formato: usuario@email.com",
    });
  } else {
    let Nombre = txtNombre.value;
    let Apellido1 = txtApellido1.value;
    let Apellido2 = txtApellido2.value;
    let Position = slctPosition.value;
    let Correo = txtCorreo.value;
    let Estado = slctEstado.value;

    modificar_persona(
      _id,
      Nombre,
      Apellido1,
      Apellido2,
      Position,
      Correo,
      Estado
    );
    Swal.fire({
      icon: "success",
      title: "Información válida",
      text: "Registro completado",
      showConfirmButton: false,
    });
    limpiar_datos();
  }
}

function cancelar_datos() {
  window.location.href = "administrar-empleados.html";
  limpiar_datos();
}

// Asociar un evento al botón
btnPublicar.addEventListener("click", enviar_datos);
btnCancelar.addEventListener("click", cancelar_datos);

llenar_campos();
