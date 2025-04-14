const btnIniciarSesion = document.getElementById("btnIniciarSesion");
const txtCorreo = document.getElementById("txtCorreo");
const txtContrasenna = document.getElementById("txtContrasenna");
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
    "#formInicioSesion input[required]"
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

function validar_correo() {
  let error = false;
  let texto = txtCorreo.value;
  let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
  txtCorreo.value = "";
  txtContrasenna.value = "";
}

function mostrar_alerta_exitosa(mensaje) {
  Swal.fire({
    icon: "success",
    title: "¡Inicio de sesión exitoso!",
    text: mensaje,
    showConfirmButton: false,
    timer: 2000,
  });
}

btnIniciarSesion.addEventListener("click", async function (event) {
    event.preventDefault();
  
    let error_validar_campos_vacios = validar_campos_vacios();
    let error_validar_correo = validar_correo();
    let error_validar_contrasenna = validar_contrasenna();
  
    if (error_validar_campos_vacios) {
      Swal.fire({
        icon: "warning",
        title: "Se encontraron campos vacíos",
        text: "Por favor completa los campos señalados",
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
      let correo = txtCorreo.value;
      let contrasenna = txtContrasenna.value;

        validar_persona(correo, contrasenna);
    }
  });
  
