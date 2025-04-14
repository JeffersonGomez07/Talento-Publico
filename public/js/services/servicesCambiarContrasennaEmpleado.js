const validar_contrasenna_y_actualizar_empleado = async (
  contrasennaAnterior,
  contrasennaNueva
) => {
  await axios({
    method: "post",
    url: "http://localhost:3000/api/validarContrasennaAnteriorYActualizarEmpleado",
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
        let idEmpleado = sessionStorage.getItem("Usuario ID");
        const volver_pantalla = async () => {
          let empleado = await obtener_empleado_por_id(idEmpleado);
          let pantallaVolver;
          pantallaVolver = empleado.tipoUsuario;

          if (pantallaVolver === "Manager") {
            window.location.href = "modificar-manager.html";
          } else {
            window.location.href = "modificar-reclutador.html";
          }
        };
        volver_pantalla();
      }, 1000);
    }
  });
};
