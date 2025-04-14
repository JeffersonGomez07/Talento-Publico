const btnEnviar = document.getElementById("btnEnviar");
const txtEmail = document.getElementById("txtEmail");

function validar_campos_vacios() {
    let error = false;
    let campos_requeridos = document.querySelectorAll("#formRecuperar [required]");
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
    txtEmail.value = "";
  }

  function validar_correo() {
    let error = false;
    let texto = txtEmail.value;
    let regex = /^[a-z0-9]+@[a-z0-9]+\.[a-z]+$/;
    if (!regex.test(texto)) {
        txtEmail.classList.add("error");
      error = true;
    } else {
        txtEmail.classList.remove("error");
    }
    return error;
  }

  function enviar_datos(event) {
    event.preventDefault();
    let error_campos_vacios = validar_campos_vacios();
    let error_correo = validar_correo();
  
    if (error_campos_vacios) {
      Swal.fire({
        icon: "warning",
        title: "Se encontraron campos vacíos",
        text: "Por favor completa los campos señalados",
      });
    } else if (error_correo) {
          Swal.fire({
              icon: "warning",
              title: "Correo inválido",
              text: "El campo correo debe seguir el siguiente formato: usuario@email.com"
          });
      } else {
        let correoIngresado = txtEmail.value;

        solicitarRecuperacionContrasenna(correoIngresado);
        Swal.fire({
            icon: "success",
            title: "Correo enviado",
            text: "Se ha enviado el correo de recuperación a " + correoIngresado
        });
          limpiar_datos();
      }
  }
  btnEnviar.addEventListener("click", enviar_datos);


