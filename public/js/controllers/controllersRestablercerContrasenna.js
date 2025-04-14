const btnEnviar = document.getElementById("btnEnviar");
const txtContrasennaNueva = document.getElementById("txtContrasennaNueva");
const txtConfirmarContrasennaNueva = document.getElementById(
  "txtConfirmarContrasennaNueva"
);

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
  txtContrasennaNueva.value = "";
  txtConfirmarContrasennaNueva.value = "";
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

function validar_confirmar_contrasenna_nueva() {
  let error = false;
  let texto = txtConfirmarContrasennaNueva.value;
  let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

  if (regex.test(texto) === false) {
    txtConfirmarContrasennaNueva.classList.add("error");
    error = true;
  } else {
    txtConfirmarContrasennaNueva.classList.remove("error");
  }
  return error;
}

function enviar_datos(event) {
  event.preventDefault();
  let error_campos_vacios = validar_campos_vacios();
  let error_contrasenna_anterior = validar_contrasenna_nueva();
  let error_contrasenna_nueva = validar_confirmar_contrasenna_nueva();

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
    // Obtener la URL actual
    var url = window.location.href;

    var params = new URLSearchParams(url.split("?")[1]);

    var userType = params.get("userType");
    var userId = params.get("userId");

    let ContrasennaNueva = txtContrasennaNueva.value;
    let ConfirmarContrasennaNueva = txtConfirmarContrasennaNueva.value;

    cambiarContrasennaRecuperacion(
      userType,
      userId,
      ContrasennaNueva,
      ConfirmarContrasennaNueva
    );
    limpiar_datos();
  }
}
btnEnviar.addEventListener("click", enviar_datos);
