const solicitarRecuperacionContrasenna = async (re_correo) => {
  try {
    const response = await axios({
      method: "post",
      url: "http://localhost:3000/api/enviarRestablecerLink",
      responseType: "json",
      data: {
        correo: re_correo,
      },
    });

    if (response.data.resultado === true) {
      //No pasa nada ya que la alerta se llama en otro lugar
    } else {
      Swal.fire({
        title: "Error",
        text: response.data.msg,
        icon: "error",
      });
    }
  } catch (error) {
    console.error(error);
    Swal.fire({
      title: "Error",
      text: "Hubo un error al enviar el enlace de recuperación",
      icon: "error",
    });
  }
};

// Supongamos que esta función se llama cuando el usuario cambia su contraseña después de recibir el enlace de recuperación
const cambiarContrasennaRecuperacion = async (
  userType,
  userId,
  contrasennaNueva,
  confirmarContrasenna
) => {
  if (contrasennaNueva !== confirmarContrasenna) {
    Swal.fire({
      title: "Error",
      text: "Las contraseñas no coinciden",
      icon: "error",
    });
    return;
  }

  try {
    const response = await axios({
      method: "put",
      url: `http://localhost:3000/api/restablecerContrasenna/${userType}/${userId}`,
      responseType: "json",
      data: {
        contrasennaNueva: contrasennaNueva,
        confirmarContrasenna: confirmarContrasenna,
      },
    });

    if (response.data.resultado === true) {
      Swal.fire({
        title: "Contraseña actualizada",
        text: response.data.msg,
        icon: "success",
      });
      setTimeout(() => {
        window.location.href = 'inicio-sesion.html';
      }, 4000);

    } else {
      Swal.fire({
        title: "Error",
        text: response.data.msg,
        icon: "error",
      });
    }
  } catch (error) {
    console.error(error);
    Swal.fire({
      title: "Error",
      text: "Hubo un error al actualizar la contraseña",
      icon: "error",
    });
  }
};
