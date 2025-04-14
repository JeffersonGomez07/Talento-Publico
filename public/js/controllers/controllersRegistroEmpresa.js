const bntRegistrarse = document.getElementById("btnRegistrarse");
const txtNombreEmpresa = document.getElementById("txtNombreEmpresa");
const txtCorreo = document.getElementById("txtCorreo");
const txtContrasenna = document.getElementById("txtContrasenna");
const inputFoto = document.getElementById("fotoUsuario");
const spanAlternarContrasenna = document.querySelector(
  ".spanAlternarContrasenna"
);

spanAlternarContrasenna.addEventListener("click", function () {
  if (txtContrasenna.type === "password") {
    txtContrasenna.type = "text";
    spanAlternarContrasenna.classList.add("mostrarContrasenna");
  } else {
    txtContrasenna.type = "password";
    spanAlternarContrasenna.classList.remove("mostrarContrasenna");
  }
});

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
  let regex = /^[a-z0-9]+@[a-z0-9]+\.[a-z]+$/;
  if (regex.test(texto) === false) {
    txtCorreo.classList.add("error");
    error = true;
  } else {
    txtCorreo.classList.remove("error");
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

function limpiar_campos() {
  txtNombreEmpresa.value = "";
  txtCorreo.value = "";
  txtContrasenna.value = "";
  inputFoto.value = "";
}

function mostrar_alerta_exitosa(mensaje) {
  Swal.fire({
    icon: "success",
    title: "¡Registro exitoso!",
    text: mensaje,
    showConfirmButton: false,
    timer: 2000,
  });
}

function enviarDatos(event) {
  event.preventDefault();
  let error_campos_vacios = validar_campos_vacios();
  let error_validar_nombre = validar_nombre();
  let error_validar_correo = validar_correo();
  let error_validar_contrasenna = validar_contrasenna();

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
  } else if (error_validar_contrasenna) {
    Swal.fire({
      icon: "warning",
      title: "Contraseña inválida",
      text: "La contraseña debe seguir el siguiente formato: Debe contener al menos una letra minúscula, debe contener al menos una letra mayúscula, debe contener al menos un dígito numérico, debe tener una longitud mínima de 8 caracteres.",
    });
  } else {
    //Si no hay errores, entonces capturamos la informacion del usuario y la enviamos a la base de datos -- Este codigo esta incompleto ya que no compete este entregable
    let nombreEmpresa = txtNombreEmpresa.value;
    let correoEmpresa = txtCorreo.value;
    let contrasennaEmpresa = txtContrasenna.value;
    let foto = inputFoto.src;

    registrar_empresa(nombreEmpresa, correoEmpresa, contrasennaEmpresa, foto);

    setTimeout(function () {
      window.location.href = "./inicio-sesion.html";
    }, 2000);
    mostrar_alerta_exitosa("Felicidades! Haz creado tu cuenta de empresa!");
    limpiar_campos();
  }
}
bntRegistrarse.addEventListener("click", enviarDatos);
