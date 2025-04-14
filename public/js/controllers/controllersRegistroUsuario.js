const btnEnviar = document.getElementById("btnEnviar");
const txtNombre = document.getElementById("txtNombre");
const txtApellido1 = document.getElementById("txtApellido1");
const radioButtons = document.getElementById("radioButtons");
const txtApellido2 = document.getElementById("txtApellido2");
const txtCorreo = document.getElementById("txtEmail");
const inputFoto = document.getElementById("fotoUsuario");
const txtContrasenna = document.getElementById("txtContrasenna");
const curriculum = document.getElementById("urlArchivo");

const txtEstudiosNombre1 = document.getElementById("txtEstudiosNombre1");
const txtEstudiosUniversidad1 = document.getElementById(
  "txtEstudiosUniversidad1"
);
const txtEstudiosInicio1 = document.getElementById("txtEstudiosInicio1");
const txtEstudiosFinal1 = document.getElementById("txtEstudiosFinal1");

const txtEstudiosNombre2 = document.getElementById("txtEstudiosNombre2");
const txtEstudiosUniversidad2 = document.getElementById(
  "txtEstudiosUniversidad2"
);
const txtEstudiosInicio2 = document.getElementById("txtEstudiosInicio2");
const txtEstudiosFinal2 = document.getElementById("txtEstudiosFinal2");

const txtEstudiosNombre3 = document.getElementById("txtEstudiosNombre3");
const txtEstudiosUniversidad3 = document.getElementById(
  "txtEstudiosUniversidad3"
);
const txtEstudiosInicio3 = document.getElementById("txtEstudiosInicio3");
const txtEstudiosFinal3 = document.getElementById("txtEstudiosFinal3");

const txtExperienciaEmpresa1 = document.getElementById(
  "txtExperienciaEmpresa1"
);
const txtExperienciaPuesto1 = document.getElementById("txtExperienciaPuesto1");
const txtExperienciaInicioEmp1 = document.getElementById(
  "txtExperienciaInicio1"
);
const txtExperienciaFinalEmp1 = document.getElementById("txtExperienciaFinal1");

const txtExperienciaEmpresa2 = document.getElementById(
  "txtExperienciaEmpresa2"
);
const txtExperienciaPuesto2 = document.getElementById("txtExperienciaPuesto2");
const txtExperienciaInicioEmp2 = document.getElementById(
  "txtExperienciaInicio2"
);
const txtExperienciaFinalEmp2 = document.getElementById("txtExperienciaFinal2");

const txtExperienciaEmpresa3 = document.getElementById(
  "txtExperienciaEmpresa3"
);
const txtExperienciaPuesto3 = document.getElementById("txtExperienciaPuesto3");
const txtExperienciaInicioEmp3 = document.getElementById(
  "txtExperienciaInicio3"
);
const txtExperienciaFinalEmp3 = document.getElementById("txtExperienciaFinal3");

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
  let texto = txtNombre.value;
  let regex = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/;
  if (regex.test(texto) == false) {
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
  let regex = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/;
  if (regex.test(texto) == false) {
    txtApellido1.classList.add("ERROR");
    error = true;
  } else {
    txtApellido1.classList.remove("ERROR");
  }
  return error;
}

function validar_apellido2() {
  let error = false;
  let texto = txtApellido2.value;
  let regex = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/;
  if (regex.test(texto) == false) {
    txtApellido2.classList.add("ERROR");
    error = true;
  } else {
    txtApellido2.classList.remove("ERROR");
  }
  return error;
}

function validar_correo() {
  let error = false;
  let texto = txtCorreo.value;
  let regex = /^[a-z0-9]+@[a-z0-9]+\.[a-z]+$/;
  if (!regex.test(texto)) {
    txtEmail.classList.add("error");
    error = true;
  } else {
    txtEmail.classList.remove("error");
  }
  return error;
}

function validar_contrasenna() {
  let error = false;
  let texto = txtContrasenna.value;
  let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

  if (regex.test(texto) === false) {
    txtContrasenna.classList.add("error");
    error = true;
  } else {
    txtContrasenna.classList.remove("error");
  }
  return error;
}

// Validar experiencias y estudios
function validar_estudios_nombre1() {
  let error = false;
  let texto = txtEstudiosNombre1.value;
  let regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;

  if (regex.test(texto) === false) {
    txtEstudiosNombre1.classList.add("error");
    error = true;
  } else {
    txtEstudiosNombre1.classList.remove("error");
  }
  return error;
}

function validar_estudios_nombre2() {
  let error = false;
  let texto = txtEstudiosNombre2.value;
  let regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;

  if (texto.trim() !== "" && regex.test(texto) === false) {
    txtEstudiosNombre2.classList.add("error");
    error = true;
  } else {
    txtEstudiosNombre2.classList.remove("error");
  }
  return error;
}

function validar_estudios_nombre3() {
  let error = false;
  let texto = txtEstudiosNombre3.value;
  let regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;

  if (texto.trim() !== "" && regex.test(texto) === false) {
    txtEstudiosNombre3.classList.add("error");
    error = true;
  } else {
    txtEstudiosNombre3.classList.remove("error");
  }
  return error;
}

function validar_estudios_universidad1() {
  let error = false;
  let texto = txtEstudiosUniversidad1.value;
  let regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;

  if (regex.test(texto) === false) {
    txtEstudiosUniversidad1.classList.add("error");
    error = true;
  } else {
    txtEstudiosUniversidad1.classList.remove("error");
  }
  return error;
}

function validar_estudios_universidad2() {
  let error = false;
  let texto = txtEstudiosUniversidad2.value;
  let regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;

  if (texto.trim() !== "" && regex.test(texto) === false) {
    txtEstudiosUniversidad2.classList.add("error");
    error = true;
  } else {
    txtEstudiosUniversidad2.classList.remove("error");
  }
  return error;
}

function validar_estudios_universidad3() {
  let error = false;
  let texto = txtEstudiosUniversidad3.value;
  let regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;

  if (texto.trim() !== "" && regex.test(texto) === false) {
    txtEstudiosUniversidad3.classList.add("error");
    error = true;
  } else {
    txtEstudiosUniversidad3.classList.remove("error");
  }
  return error;
}

function validar_experiencia_empresa1() {
  let error = false;
  let texto = txtExperienciaEmpresa1.value;
  let regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;

  if (regex.test(texto) === false) {
    txtExperienciaEmpresa1.classList.add("error");
    error = true;
  } else {
    txtExperienciaEmpresa1.classList.remove("error");
  }
  return error;
}

function validar_experiencia_empresa2() {
  let error = false;
  let texto = txtExperienciaEmpresa2.value;
  let regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;

  if (texto.trim() !== "" && regex.test(texto) === false) {
    txtExperienciaEmpresa2.classList.add("error");
    error = true;
  } else {
    txtExperienciaEmpresa2.classList.remove("error");
  }
  return error;
}

function validar_experiencia_empresa3() {
  let error = false;
  let texto = txtExperienciaEmpresa3.value;
  let regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;

  if (texto.trim() !== "" && regex.test(texto) === false) {
    txtExperienciaEmpresa3.classList.add("error");
    error = true;
  } else {
    txtExperienciaEmpresa3.classList.remove("error");
  }
  return error;
}

function validar_experiencia_puesto1() {
  let error = false;
  let texto = txtExperienciaPuesto1.value;
  let regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;

  if (regex.test(texto) === false) {
    txtExperienciaPuesto1.classList.add("error");
    error = true;
  } else {
    txtExperienciaPuesto1.classList.remove("error");
  }
  return error;
}

function validar_experiencia_puesto2() {
  let error = false;
  let texto = txtExperienciaPuesto2.value;
  let regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;

  if (texto.trim() !== "" && regex.test(texto) === false) {
    txtExperienciaPuesto2.classList.add("error");
    error = true;
  } else {
    txtExperienciaPuesto2.classList.remove("error");
  }
  return error;
}

function validar_experiencia_puesto3() {
  let error = false;
  let texto = txtExperienciaPuesto3.value;
  let regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;

  if (texto.trim() !== "" && regex.test(texto) === false) {
    txtExperienciaPuesto3.classList.add("error");
    error = true;
  } else {
    txtExperienciaPuesto3.classList.remove("error");
  }
  return error;
}

function limpiar_campos() {
  document.getElementById("formDatosPuesto").reset();
}

function mostrar_alerta_exitosa(mensaje) {
  Swal.fire({
    icon: "success",
    title: "¡Usuario registrado exitosamente!",
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
  let error_contrasenna = validar_contrasenna();
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
  } else if (error_contrasenna) {
    Swal.fire({
      icon: "warning",
      title: "Contraseña inválida",
      text: "La contraseña debe seguir el siguiente formato: Debe contener al menos una letra minúscula, debe contener al menos una letra mayúscula, debe contener al menos un dígito numérico, debe tener una longitud mínima de 8 caracteres.",
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
    let Nombre = txtNombre.value;
    let Apellido1 = txtApellido1.value;
    let RadioBoton = radioButtons.value;
    let Apellido2 = txtApellido2.value;
    let Correo = txtCorreo.value;
    let Contrasenna = txtContrasenna.value;
    let Foto = inputFoto.src;
    let Archivo = curriculum.value;
    //Estudios1
    let EstudiosNombre1 = txtEstudiosNombre1.value;
    let EstudiosUniversidad1 = txtEstudiosUniversidad1.value;
    let Estudiosinicio1 = txtEstudiosInicio1.value;
    let EstudiosFinalizacion1 = txtEstudiosFinal1.value;
    //Estudios2
    let EstudiosNombre2 = txtEstudiosNombre2.value;
    let EstudiosUniversidad2 = txtEstudiosUniversidad2.value;
    let Estudiosinicio2 = txtEstudiosInicio2.value;
    let EstudiosFinalizacion2 = txtEstudiosFinal2.value;
    //Estudios3
    let EstudiosNombre3 = txtEstudiosNombre3.value;
    let EstudiosUniversidad3 = txtEstudiosUniversidad3.value;
    let Estudiosinicio3 = txtEstudiosInicio3.value;
    let EstudiosFinalizacion3 = txtEstudiosFinal3.value;
    //Empresa1
    let ExperienciaEmpresa1 = txtExperienciaEmpresa1.value;
    let ExperienciaPuesto1 = txtExperienciaPuesto1.value;
    let ExperienciaInicioEmp1 = txtExperienciaInicioEmp1.value;
    let ExperienciaFinalEmp1 = txtExperienciaFinalEmp1.value;
    //Empresa2
    let ExperienciaEmpresa2 = txtExperienciaEmpresa2.value;
    let ExperienciaPuesto2 = txtExperienciaPuesto2.value;
    let ExperienciaInicioEmp2 = txtExperienciaInicioEmp2.value;
    let ExperienciaFinalEmp2 = txtExperienciaFinalEmp2.value;
    //Empresa3
    let ExperienciaEmpresa3 = txtExperienciaEmpresa3.value;
    let ExperienciaPuesto3 = txtExperienciaPuesto3.value;
    let ExperienciaInicioEmp3 = txtExperienciaInicioEmp3.value;
    let ExperienciaFinalEmp3 = txtExperienciaFinalEmp3.value;

    registrar_usuario(
      Nombre,
      Apellido1,
      RadioBoton,
      Apellido2,
      Correo,
      Contrasenna,
      Foto,
      Archivo,

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

    mostrar_alerta_exitosa("Felicidades, te has registrado con éxito!");
    // setTimeout(function () {
    //   window.location.href = "./inicio-sesion.html";
    // }, 2000);
    limpiar_campos();
  }
}
btnEnviar.addEventListener("click", enviarDatos);