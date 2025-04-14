let idUsuario = sessionStorage.getItem("Usuario ID");

const btnEnviar = document.getElementById("btnEnviar");
const txtContrasennaAnterior = document.getElementById(
  "txtContrasennaAnterior"
);
const txtContrasennaNueva = document.getElementById("txtContrasennaNueva");
let _id;

function validar_campos_vacios() {
  let error = false;
  let campos_requeridos = document.querySelectorAll("#formCambiar [required]");
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

function limpiar_datos() {
  txtContrasennaAnterior.value = "";
  txtContrasennaNueva.value = "";
}

function validar_contrasenna_anterior() {
  let error = false;
  let texto = txtContrasennaAnterior.value;
  let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

  if (regex.test(texto) === false) {
    txtContrasennaAnterior.classList.add("error");
    error = true;
  } else {
    txtContrasennaAnterior.classList.remove("error");
  }
  return error;
}

function validar_contrasenna_nueva() {
  let error = false;
  let texto = txtContrasennaNueva.value;
  let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

  if (regex.test(texto) === false) {
    txtContrasennaNueva.classList.add("error");
    error = true;
  } else {
    txtContrasennaNueva.classList.remove("error");
  }
  return error;
}

function enviar_datos(event) {
  event.preventDefault();
  let error_campos_vacios = validar_campos_vacios();
  let error_contrasenna_anterior = validar_contrasenna_anterior();
  let error_contrasenna_nueva = validar_contrasenna_nueva();

  if (error_campos_vacios) {
    Swal.fire({
      icon: "warning",
      title: "Se encontraron campos vacíos",
      text: "Por favor completa los campos señalados",
    });
  } else if (error_contrasenna_anterior) {
    Swal.fire({
      icon: "warning",
      title: "Contraseña anterior invalida",
      text: "El campo contraseña nueva debe seguir el siguiente formato: Debe incluir letras y números. Debe combinar letras mayúsculas y minúsculas. La contraseña debe incluir caracteres especiales.  La longitud de la contraseña debe ser igual o mayor a 8 caracteres. ",
    });
  } else if (error_contrasenna_nueva) {
    Swal.fire({
      icon: "warning",
      title: "Contraseña nueva invalida",
      text: "El campo contraseña nueva debe seguir el siguiente formato: Debe incluir letras y números. Debe combinar letras mayúsculas y minúsculas. La contraseña debe incluir caracteres especiales.  La longitud de la contraseña debe ser igual o mayor a 8 caracteres. ",
    });
  } else {
    let ContrasennaAnterior = txtContrasennaAnterior.value;
    let ContrasennaNueva = txtContrasennaNueva.value;

    validar_contrasenna_y_actualizar(ContrasennaAnterior, ContrasennaNueva);
    limpiar_datos();
  }
}
btnEnviar.addEventListener("click", enviar_datos);
