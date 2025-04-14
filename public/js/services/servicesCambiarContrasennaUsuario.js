const validar_contrasenna_y_actualizar_usuario = async (contrasennaAnterior, contrasennaNueva) => {
    await axios({
      method: "post",
      url: "http://localhost:3000/api/validarContrasennaAnteriorYActualizarUsuario",
      responseType: "json",
      data: {
        _id: sessionStorage.getItem("Usuario ID"),
        contrasennaAnterior: contrasennaAnterior,
        contrasennaNueva: contrasennaNueva,
      },
    }).then((res) => {
      if (res.data.resultado == false) {
        Swal.fire({
          title: "Error",
          text: res.data.msg,
          icon: "error",
        });
      } else {
        Swal.fire({
          title: "Contraseña Actualizada",
          text: res.data.msg,
          icon: "success",
        });
        setTimeout(() => {
          window.location.href = "panel-usuario.html";
        }, 1000);
      }
    });
  };
  