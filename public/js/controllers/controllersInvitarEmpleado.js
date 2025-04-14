let empresaID = sessionStorage.getItem('Usuario ID');

const btnPublicar = document.getElementById("btnSubmit");
const btnCancelar = document.getElementById("btnCancel");
const txtNombre = document.getElementById("txtNombre");
const txtApellido1 = document.getElementById("txtApellido1");
const txtApellido2 = document.getElementById("txtApellido2");
const txtContrasenna = document.getElementById("txtContrasenna");
const slctPosition = document.getElementById("slctPosition");
const txtCorreo = document.getElementById("txtCorreo");

async function nombre_empresa(empresaID) {
  try {
    const empresa = await obtener_empresa_por_id(empresaID);
    if (empresa) {
      return empresa.nombre;
    } else {
      throw new Error("No se pudo obtener el nombre de la empresa");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

function validar_campos_vacios() {
  let error = false;
  let campos_requeridos = document.querySelectorAll("#formDatosEmpleado [required]");
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

function validar_contrasenna() {
  let error = false;
  let texto = txtContrasenna.value;
  let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  if (!regex.test(texto)) {
    txtContrasenna.classList.add("error");
    error = true;
  } else {
    txtContrasenna.classList.remove("error");
  }
  return error;
}

function validar_correo() {
  let error = false;
  let texto = txtCorreo.value;
  let regex = /^[a-z0-9]+@[a-z0-9]+\.[a-z]+$/;
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
  txtContrasenna.value = "";
  txtCorreo.value = "";
  document.getElementById("slctPosition").value = "null";
}

function mostrar_alerta_exitosa(mensaje) {
  Swal.fire({
    icon: "success",
    title: "¡Empleado invitado!",
    text: mensaje,
    showConfirmButton: true,
  });
}

async function enviar_datos() {
  let error_campos_vacios = validar_campos_vacios();
  let error_nombre = validar_nombre();
  let error_apellido1 = validar_apellido1();
  let error_apellido2 = validar_apellido2();
  let error_contrasenna = validar_contrasenna();
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
            text: "El campo apellido solo puede contener letras"
        });
    } else if (error_apellido2) {
      Swal.fire({
          icon: "warning",
          title: "Apellido 2 inválido",
          text: "El campo apellido solo puede contener letras"
      });
    } else if (error_contrasenna) {
        Swal.fire({
            icon: "warning",
            title: "Contraseña inválida",
            text: "La contraseña debe seguir el siguiente formato: Debe contener al menos una letra minúscula, debe contener al menos una letra mayúscula, debe contener al menos un dígito numérico, debe tener una longitud mínima de 8 caracteres."   
          });
    } else if (error_correo) {
        Swal.fire({
            icon: "warning",
            title: "Correo inválido",
            text: "El campo correo debe seguir el siguiente formato: usuario@email.com"
        });
    } else {
      const empresaID = sessionStorage.getItem('Usuario ID');
      const Empresa = await nombre_empresa(empresaID);

      let Nombre = txtNombre.value;
      let Apellido1 = txtApellido1.value;
      let Apellido2 = txtApellido2.value;
      let Contrasenna = txtContrasenna.value;
      let TipoUsuario = slctPosition.value;
      let Correo = txtCorreo.value;
      invitar_empleado(Nombre, Apellido1, Apellido2, Contrasenna, TipoUsuario, Correo, Empresa);

      mostrar_alerta_exitosa("Haz invitado al empleado correctamente!");
      limpiar_datos();
        
    }
}

function cancelar_datos() {
    Swal.fire({
        icon: "error",
        title: "Registro cancelado",
        text: "Se borrarán los datos"
    });
    txtNombre.classList.remove("error");
    txtApellido1.classList.remove("error");
    txtApellido2.classList.remove("error");
    txtContrasenna.classList.remove("error");
    txtCorreo.classList.remove("error");
    slctPosition.classList.remove("error");
    limpiar_datos()
}




// Asociar un evento al botón
btnPublicar.addEventListener("click", enviar_datos);
btnCancelar.addEventListener("click", cancelar_datos);




