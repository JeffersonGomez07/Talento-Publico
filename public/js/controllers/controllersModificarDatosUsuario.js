"use strict";

let idUsuario = sessionStorage.getItem("Usuario ID");

const btnVolver = document.getElementById("btnCancel");
const btnActualizar = document.getElementById("btnSubmit");
const txtNombreActualizar = document.getElementById("txtNombre");
const txtApellido1Actualizar = document.getElementById("txtApellido1");
const radioButtonsActualizar = document.getElementById("radioButtons");
const txtApellido2Actualizar = document.getElementById("txtApellido2");
const txtCorreoActualizar = document.getElementById("txtEmail");
const inputFotoActualizar = document.getElementById("fotoUsuario");

const txtEstudiosNombre1Actualizar = document.getElementById("txtEstudiosNombre1");
const txtEstudiosUniversidad1Actualizar = document.getElementById(
  "txtEstudiosUniversidad1"
);
const txtEstudiosInicio1Actualizar = document.getElementById("txtEstudiosInicio1");
const txtEstudiosFinal1Actualizar = document.getElementById("txtEstudiosFinal1");

const txtEstudiosNombre2Actualizar = document.getElementById("txtEstudiosNombre2");
const txtEstudiosUniversidad2Actualizar = document.getElementById(
  "txtEstudiosUniversidad2"
);
const txtEstudiosInicio2Actualizar = document.getElementById("txtEstudiosInicio2");
const txtEstudiosFinal2Actualizar = document.getElementById("txtEstudiosFinal2");

const txtEstudiosNombre3Actualizar = document.getElementById("txtEstudiosNombre3");
const txtEstudiosUniversidad3Actualizar = document.getElementById(
  "txtEstudiosUniversidad3"
);
const txtEstudiosInicio3Actualizar = document.getElementById("txtEstudiosInicio3");
const txtEstudiosFinal3Actualizar = document.getElementById("txtEstudiosFinal3");

const txtExperienciaEmpresa1Actualizar = document.getElementById(
  "txtExperienciaEmpresa1"
);
const txtExperienciaPuesto1Actualizar = document.getElementById("txtExperienciaPuesto1");
const txtExperienciaInicioEmp1Actualizar = document.getElementById(
  "txtExperienciaInicio1"
);
const txtExperienciaFinalEmp1Actualizar = document.getElementById("txtExperienciaFinal1");

const txtExperienciaEmpresa2Actualizar = document.getElementById(
  "txtExperienciaEmpresa2"
);
const txtExperienciaPuesto2Actualizar = document.getElementById("txtExperienciaPuesto2");
const txtExperienciaInicioEmp2Actualizar = document.getElementById(
  "txtExperienciaInicio2"
);
const txtExperienciaFinalEmp2Actualizar = document.getElementById("txtExperienciaFinal2");

const txtExperienciaEmpresa3Actualizar = document.getElementById(
  "txtExperienciaEmpresa3"
);
const txtExperienciaPuesto3Actualizar = document.getElementById("txtExperienciaPuesto3");
const txtExperienciaInicioEmp3Actualizar = document.getElementById(
  "txtExperienciaInicio3"
);
const txtExperienciaFinalEmp3Actualizar = document.getElementById("txtExperienciaFinal3");
let _id;

const llenar_campos = async () => {
  let usuario = await obtener_usuario_por_id(idUsuario);
  const primerEstudio = usuario.estudios[0];
  const segundoEstudio = usuario.estudios[1];
  const tercerEstudio = usuario.estudios[2];

  const primerExperiencia = usuario.experiencias[0];
  const segundoExperiencia = usuario.experiencias[1];
  const tercerExperiencia = usuario.experiencias[2];
  const generoUsuario = usuario.genero;

  if (usuario) {
    _id = usuario._id;
    txtNombreActualizar.value = usuario.nombre;
    txtApellido1Actualizar.value = usuario.apellido1;
    const radioButtonsActualizar = document.querySelectorAll('[name="genero"]');

    radioButtonsActualizar.forEach(radio => {
      if (radio.value === generoUsuario) {
        radio.checked = true;
      }
    });
    txtApellido2Actualizar.value = usuario.apellido2;
    txtCorreoActualizar.value = usuario.correo;

    if (
      usuario.fotoPerfil === "" ||
      inputFotoActualizar.src === "./img/ImgFondoBlanco.png"
    ) {
      inputFotoActualizar.src = "./img/ImgFondoBlanco.png";
    } else {
      inputFotoActualizar.src = usuario.fotoPerfil;
    }

    txtEstudiosNombre1Actualizar.value = primerEstudio.estudio;
    txtEstudiosUniversidad1Actualizar.value = primerEstudio.universidad;
    txtEstudiosInicio1Actualizar.value = primerEstudio.annoInicio;
    txtEstudiosFinal1Actualizar.value = primerEstudio.annoFinalizacion;

    txtEstudiosNombre2Actualizar.value = segundoEstudio.estudio;
    txtEstudiosUniversidad2Actualizar.value = segundoEstudio.universidad;
    txtEstudiosInicio2Actualizar.value = segundoEstudio.annoInicio;
    txtEstudiosFinal2Actualizar.value = segundoEstudio.annoFinalizacion;
    
    txtEstudiosNombre3Actualizar.value = tercerEstudio.estudio;
    txtEstudiosUniversidad3Actualizar.value = tercerEstudio.universidad;
    txtEstudiosInicio3Actualizar.value = tercerEstudio.annoInicio;
    txtEstudiosFinal3Actualizar.value = tercerEstudio.annoFinalizacion;

    //Experiencia
    txtExperienciaEmpresa1Actualizar.value = primerExperiencia.empresa;
    txtExperienciaPuesto1Actualizar.value = primerExperiencia.puesto;
    txtExperienciaInicioEmp1Actualizar.value = primerExperiencia.annoInicioEmp;
    txtExperienciaFinalEmp1Actualizar.value = primerExperiencia.annoFinalizacionEmp;

    txtExperienciaEmpresa2Actualizar.value = segundoExperiencia.empresa;
    txtExperienciaPuesto2Actualizar.value = segundoExperiencia.puesto;
    txtExperienciaInicioEmp2Actualizar.value = segundoExperiencia.annoInicioEmp;
    txtExperienciaFinalEmp2Actualizar.value = segundoExperiencia.annoFinalizacionEmp;

    txtExperienciaEmpresa3Actualizar.value = tercerExperiencia.empresa;
    txtExperienciaPuesto3Actualizar.value = tercerExperiencia.puesto;
    txtExperienciaInicioEmp3Actualizar.value = tercerExperiencia.annoInicioEmp;
    txtExperienciaFinalEmp3Actualizar.value = tercerExperiencia.annoFinalizacionEmp;

  }
};


function validar_campos_vacios() {
  let error = false;
  let camposRequeridos = document.querySelectorAll(
    "#formDatosPuesto input[required]"
  );

  for (let i = 0; i < camposRequeridos.length; i++) {
    if (camposRequeridos[i].type === "radio") {
      if (
        !document.querySelector(
          'input[name="' + camposRequeridos[i].name + '"]:checked'
        )
      ) {
        camposRequeridos[i].classList.add("errorRadio");
        error = true;
      } else {
        camposRequeridos[i].classList.remove("errorRadio");
      }
    } else {
      if (camposRequeridos[i].value === "") {
        camposRequeridos[i].classList.add("error");
        error = true;
      } else {
        camposRequeridos[i].classList.remove("error");
      }
    }
  }

  return error;
}

function validar_nombre() {
  let error = false;
  let texto = txtNombreActualizar.value;
  let regex = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/;
  if (regex.test(texto) == false) {
    txtNombreActualizar.classList.add("error");
    error = true;
  } else {
    txtNombreActualizar.classList.remove("error");
  }
  return error;
}

function validar_apellido1() {
  let error = false;
  let texto = txtApellido1Actualizar.value;
  let regex = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/;
  if (regex.test(texto) == false) {
    txtApellido1Actualizar.classList.add("ERROR");
    error = true;
  } else {
    txtApellido1Actualizar.classList.remove("ERROR");
  }
  return error;
}

function validar_apellido2() {
  let error = false;
  let texto = txtApellido2Actualizar.value;
  let regex = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/;
  if (regex.test(texto) == false) {
    txtApellido2Actualizar.classList.add("ERROR");
    error = true;
  } else {
    txtApellido2Actualizar.classList.remove("ERROR");
  }
  return error;
}

function validar_correo() {
  let error = false;
  let texto = txtCorreoActualizar.value;
  let regex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]+$/;
  if (!regex.test(texto)) {
    txtCorreoActualizar.classList.add("error");
    error = true;
  } else {
    txtCorreoActualizar.classList.remove("error");
  }
  return error;
}

// Validar experiencias y estudios
function validar_estudios_nombre1() {
  let error = false;
  let texto = txtEstudiosNombre1Actualizar.value;
  let regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;

  if (regex.test(texto) === false) {
    txtEstudiosNombre1Actualizar.classList.add("error");
    error = true;
  } else {
    txtEstudiosNombre1Actualizar.classList.remove("error");
  }
  return error;
}

function validar_estudios_nombre2() {
  let error = false;
  let texto = txtEstudiosNombre2Actualizar.value;
  let regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;

  if (texto.trim() !== "" && regex.test(texto) === false) {
    txtEstudiosNombre2Actualizar.classList.add("error");
    error = true;
  } else {
    txtEstudiosNombre2Actualizar.classList.remove("error");
  }
  return error;
}

function validar_estudios_nombre3() {
  let error = false;
  let texto = txtEstudiosNombre3Actualizar.value;
  let regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;

  if (texto.trim() !== "" && regex.test(texto) === false) {
    txtEstudiosNombre3Actualizar.classList.add("error");
    error = true;
  } else {
    txtEstudiosNombre3Actualizar.classList.remove("error");
  }
  return error;
}

function validar_estudios_universidad1() {
  let error = false;
  let texto = txtEstudiosUniversidad1Actualizar.value;
  let regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;

  if (regex.test(texto) === false) {
    txtEstudiosUniversidad1Actualizar.classList.add("error");
    error = true;
  } else {
    txtEstudiosUniversidad1Actualizar.classList.remove("error");
  }
  return error;
}

function validar_estudios_universidad2() {
  let error = false;
  let texto = txtEstudiosUniversidad2Actualizar.value;
  let regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;

  if (texto.trim() !== "" && regex.test(texto) === false) {
    txtEstudiosUniversidad2Actualizar.classList.add("error");
    error = true;
  } else {
    txtEstudiosUniversidad2Actualizar.classList.remove("error");
  }
  return error;
}

function validar_estudios_universidad3() {
  let error = false;
  let texto = txtEstudiosUniversidad3Actualizar.value;
  let regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;

  if (texto.trim() !== "" && regex.test(texto) === false) {
    txtEstudiosUniversidad3Actualizar.classList.add("error");
    error = true;
  } else {
    txtEstudiosUniversidad3Actualizar.classList.remove("error");
  }
  return error;
}

function validar_experiencia_empresa1() {
  let error = false;
  let texto = txtExperienciaEmpresa1Actualizar.value;
  let regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;

  if (regex.test(texto) === false) {
    txtExperienciaEmpresa1Actualizar.classList.add("error");
    error = true;
  } else {
    txtExperienciaEmpresa1Actualizar.classList.remove("error");
  }
  return error;
}

function validar_experiencia_empresa2() {
  let error = false;
  let texto = txtExperienciaEmpresa2Actualizar.value;
  let regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;

  if (texto.trim() !== "" && regex.test(texto) === false) {
    txtExperienciaEmpresa2Actualizar.classList.add("error");
    error = true;
  } else {
    txtExperienciaEmpresa2Actualizar.classList.remove("error");
  }
  return error;
}

function validar_experiencia_empresa3() {
  let error = false;
  let texto = txtExperienciaEmpresa3Actualizar.value;
  let regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;

  if (texto.trim() !== "" && regex.test(texto) === false) {
    txtExperienciaEmpresa3Actualizar.classList.add("error");
    error = true;
  } else {
    txtExperienciaEmpresa3Actualizar.classList.remove("error");
  }
  return error;
}

function validar_experiencia_puesto1() {
  let error = false;
  let texto = txtExperienciaPuesto1Actualizar.value;
  let regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;

  if (regex.test(texto) === false) {
    txtExperienciaPuesto1Actualizar.classList.add("error");
    error = true;
  } else {
    txtExperienciaPuesto1Actualizar.classList.remove("error");
  }
  return error;
}

function validar_experiencia_puesto2() {
  let error = false;
  let texto = txtExperienciaPuesto2Actualizar.value;
  let regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;

  if (texto.trim() !== "" && regex.test(texto) === false) {
    txtExperienciaPuesto2Actualizar.classList.add("error");
    error = true;
  } else {
    txtExperienciaPuesto2Actualizar.classList.remove("error");
  }
  return error;
}

function validar_experiencia_puesto3() {
  let error = false;
  let texto = txtExperienciaPuesto3Actualizar.value;
  let regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;

  if (texto.trim() !== "" && regex.test(texto) === false) {
    txtExperienciaPuesto3Actualizar.classList.add("error");
    error = true;
  } else {
    txtExperienciaPuesto3Actualizar.classList.remove("error");
  }
  return error;
}

function limpiar_campos() {
  document.getElementById("formDatosPuesto").reset();
}

function mostrar_alerta_exitosa(mensaje) {
  Swal.fire({
    icon: "success",
    title: "¡Usuario modificado!",
    text: mensaje,
    showConfirmButton: false,
    timer: 2000,
  });
}

function enviarDatos(event) {
    event.preventDefault();
  event.preventDefault();

  let error_campos_vacios = validar_campos_vacios();
  let error_nombre = validar_nombre();
  let error_apellido1 = validar_apellido1();
  let error_apellido2 = validar_apellido2();
  let error_correo = validar_correo();
  let error_estudios_nombre1 = validar_estudios_nombre1();
  let error_estudios_nombre2 = validar_estudios_nombre2();
  let error_estudios_nombre3 = validar_estudios_nombre3();
  let error_experiencia_empresa1 = validar_experiencia_empresa1();
  let error_experiencia_empresa2 = validar_experiencia_empresa2();
  let error_experiencia_empresa3 = validar_experiencia_empresa3();
  let error_experiencia_puesto1 = validar_experiencia_puesto1();
  let error_experiencia_puesto2 = validar_experiencia_puesto2();
  let error_experiencia_puesto3 = validar_experiencia_puesto3();
  let error_estudios_universidad1 = validar_estudios_universidad1();
  let error_estudios_universidad2 = validar_estudios_universidad2();
  let error_estudios_universidad3 = validar_estudios_universidad3();

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
      text: "El campo Nombre solo puede contener letras",
    });
  } else if (error_apellido1) {
    Swal.fire({
      icon: "warning",
      title: "Apellido 1 inválido",
      text: "El campo Apellido solo puede contener letras",
    });
  } else if (error_apellido2) {
    Swal.fire({
      icon: "warning",
      title: "Apellido 2 inválido",
      text: "El campo Apellido solo puede contener letras",
    });
  } else if (error_correo) {
    Swal.fire({
      icon: "warning",
      title: "Correo inválido",
      text: "El campo correo debe seguir el siguiente formato: usuario@email.com",
    });
  } else if (error_estudios_nombre1) {
    Swal.fire({
      icon: "warning",
      title: "Nombre de estudios 1 inválido",
      text: "El nombre de estudios solo debe contener letras.",
    });
  } else if (error_estudios_nombre2) {
    Swal.fire({
      icon: "warning",
      title: "Nombre de estudios 2 inválido",
      text: "El nombre de estudios solo debe contener letras.",
    });
  } else if (error_estudios_nombre3) {
    Swal.fire({
      icon: "warning",
      title: "Nombre de estudios 3 inválido",
      text: "El nombre de estudios solo debe contener letras.",
    });
  } else if (error_estudios_universidad1) {
    Swal.fire({
      icon: "warning",
      title: "Nombre de universidad 1 inválido",
      text: "El nombre de la universidad solo debe contener letras.",
    });
  } else if (error_estudios_universidad2) {
    Swal.fire({
      icon: "warning",
      title: "Nombre de universidad 2 inválido",
      text: "El nombre de la universidad solo debe contener letras.",
    });
  } else if (error_estudios_universidad3) {
    Swal.fire({
      icon: "warning",
      title: "Nombre de universidad 3 inválido",
      text: "El nombre de la universidad solo debe contener letras.",
    });
  } else if (error_experiencia_empresa1) {
    Swal.fire({
      icon: "warning",
      title: "Nombre de empresa 1 inválido",
      text: "El nombre de empresa solo debe contener letras.",
    });
  } else if (error_experiencia_empresa2) {
    Swal.fire({
      icon: "warning",
      title: "Nombre de empresa 2 inválido",
      text: "El nombre de empresa solo debe contener letras.",
    });
  } else if (error_experiencia_empresa3) {
    Swal.fire({
      icon: "warning",
      title: "Nombre de empresa 3 inválido",
      text: "El nombre de empresa solo debe contener letras.",
    });
  } else if (error_experiencia_puesto1) {
    Swal.fire({
      icon: "warning",
      title: "Nombre de puesto 1 inválido",
      text: "El nombre de puesto solo debe contener letras.",
    });
  } else if (error_experiencia_puesto2) {
    Swal.fire({
      icon: "warning",
      title: "Nombre de puesto 2 inválido",
      text: "El nombre de puesto solo debe contener letras.",
    });
  } else if (error_experiencia_puesto3) {
    Swal.fire({
      icon: "warning",
      title: "Nombre de puesto 3 inválido",
      text: "El nombre de puesto solo debe contener letras.",
    });
  } else {
    let Nombre = txtNombreActualizar.value;
    let Apellido1 = txtApellido1Actualizar.value;
    let RadioBoton = radioButtonsActualizar.value;
    let Apellido2 = txtApellido2Actualizar.value;
    let Correo = txtCorreoActualizar.value;
    let Foto = inputFotoActualizar.src;
    //Estudios1
    let EstudiosNombre1 = txtEstudiosNombre1Actualizar.value;
    let EstudiosUniversidad1 = txtEstudiosUniversidad1Actualizar.value;
    let Estudiosinicio1 = txtEstudiosInicio1Actualizar.value;
    let EstudiosFinalizacion1 = txtEstudiosFinal1Actualizar.value;
    //Estudios2
    let EstudiosNombre2 = txtEstudiosNombre2Actualizar.value;
    let EstudiosUniversidad2 = txtEstudiosUniversidad2Actualizar.value;
    let Estudiosinicio2 = txtEstudiosInicio2Actualizar.value;
    let EstudiosFinalizacion2 = txtEstudiosFinal2Actualizar.value;
    //Estudios3
    let EstudiosNombre3 = txtEstudiosNombre3Actualizar.value;
    let EstudiosUniversidad3 = txtEstudiosUniversidad3Actualizar.value;
    let Estudiosinicio3 = txtEstudiosInicio3Actualizar.value;
    let EstudiosFinalizacion3 = txtEstudiosFinal3Actualizar.value;
    //Empresa1
    let ExperienciaEmpresa1 = txtExperienciaEmpresa1Actualizar.value;
    let ExperienciaPuesto1 = txtExperienciaPuesto1Actualizar.value;
    let ExperienciaInicioEmp1 = txtExperienciaInicioEmp1Actualizar.value;
    let ExperienciaFinalEmp1 = txtExperienciaFinalEmp1Actualizar.value;
    //Empresa2
    let ExperienciaEmpresa2 = txtExperienciaEmpresa2Actualizar.value;
    let ExperienciaPuesto2 = txtExperienciaPuesto2Actualizar.value;
    let ExperienciaInicioEmp2 = txtExperienciaInicioEmp2Actualizar.value;
    let ExperienciaFinalEmp2 = txtExperienciaFinalEmp2Actualizar.value;
    //Empresa3
    let ExperienciaEmpresa3 = txtExperienciaEmpresa3Actualizar.value;
    let ExperienciaPuesto3 = txtExperienciaPuesto3Actualizar.value;
    let ExperienciaInicioEmp3 = txtExperienciaInicioEmp3Actualizar.value;
    let ExperienciaFinalEmp3 = txtExperienciaFinalEmp3Actualizar.value;

    modificar_usuario(
      _id,
      Nombre,
      Apellido1,
      RadioBoton,
      Apellido2,
      Correo,
      Foto,

      EstudiosNombre1,
      EstudiosUniversidad1,
      Estudiosinicio1,
      EstudiosFinalizacion1,

      EstudiosNombre2,
      EstudiosUniversidad2,
      Estudiosinicio2,
      EstudiosFinalizacion2,

      EstudiosNombre3,
      EstudiosUniversidad3,
      Estudiosinicio3,
      EstudiosFinalizacion3,

      ExperienciaEmpresa1,
      ExperienciaPuesto1,
      ExperienciaInicioEmp1,
      ExperienciaFinalEmp1,

      ExperienciaEmpresa2,
      ExperienciaPuesto2,
      ExperienciaInicioEmp2,
      ExperienciaFinalEmp2,

      ExperienciaEmpresa3,
      ExperienciaPuesto3,
      ExperienciaInicioEmp3,
      ExperienciaFinalEmp3,
    );

    mostrar_alerta_exitosa("Has modificado tú cuenta con éxito!");
    // setTimeout(function () {
    //   window.location.href = "panel-usuario.html";
    // }, 2000);
    limpiar_campos();
  }
}

function cancelar_datos() {
  window.location.href = "panel-usuario.html";
  limpiar_datos();
}

btnVolver.addEventListener("click", cancelar_datos);
btnActualizar.addEventListener("click", enviarDatos);

llenar_campos();
