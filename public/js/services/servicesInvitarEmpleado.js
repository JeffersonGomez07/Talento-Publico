//registrar una persona
const invitar_empleado = async (
  ie_nombre,
  ie_apellido1,
  ie_apellido2,
  ie_contrasenna,
  ie_tipoUsuario,
  ie_correo,
  ie_empresa_empleado
) => {
  await axios({
    method: "post",
    url: "http://localhost:3000/api/invitarEmpleado",
    responseType: "json",
    data: {
      nombre: ie_nombre,
      apellido1: ie_apellido1,
      apellido2: ie_apellido2,
      contrasenna: ie_contrasenna,
      tipoUsuario: ie_tipoUsuario,
      correo: ie_correo,
      empresa_empleado: ie_empresa_empleado,
    },
  })
    .then((res) => {
      if (res.data.resultado == false) {
        switch (res.data.error.code) {
          case 11000:
            Swal.fire({
              title: "No se completó la invitación al empleado",
              text: "El empleado ya esta invitado",
              icon: "warning",
            });
            break;
        }
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

const listar_empleados_BD = async () => {
  let lista_empleados = [];
  await axios({
    method: "get",
    url: "http://localhost:3000/api/invitarEmpleado",
    responseType: "json",
  })
    .then((res) => {
      //console.log(res.data.resultado[0])
      lista_empleados = res.data.resultado;
    })
    .catch((error) => {
      console.log(error);
    });

  return lista_empleados;
};

//buscar una persona por su cedula
const obtener_empleado_correo = async (correo) => {
  let empleado;

  try {
    const respuesta = await axios({
      method: "get",
      params: { correo: correo },
      url: "http://localhost:3000/api/buscarPersonaCorreo",
      responseType: "json",
    });

    //console.log(respuesta.data.empleado[0])
    empleado = respuesta.data.empleado;
  } catch (error) {
    console.log(error);
  }

  return empleado;
};

//OBTENER
const obtener_empleado_por_id = async (id) => {
  let empleado;

  try {
    const respuesta = await axios({
      method: "get",
      params: { id: id },
      url: "http://localhost:3000/api/buscarEmpleadoPorId",
      responseType: "json",
    });

    empleado = respuesta.data.empleado;
  } catch (error) {
    console.log(error);
  }

  return empleado;
};

const modificar_persona = async (
  ie_id,
  ie_nombre,
  ie_apellido1,
  ie_apellido2,
  ie_tipoUsuario,
  ie_correo,
  ie_estado
) => {
  await axios({
    method: "put",
    url: "http://localhost:3000/api/invitarEmpleado",
    data: {
      _id: ie_id,
      nombre: ie_nombre,
      apellido1: ie_apellido1,
      apellido2: ie_apellido2,
      tipoUsuario: ie_tipoUsuario,
      correo: ie_correo,
      estado: ie_estado,
    },
  })
    .then(() => {
      setTimeout(() => {
        window.location.href = "administrar-empleados.html";
      }, 1000);
    })
    .catch((error) => {
      console.log(error);
    });
};

const modificar_empleado = async (
  ie_id,
  ie_nombre,
  ie_apellido1,
  ie_apellido2,
  ie_correo
) => {
  await axios({
    method: "put",
    url: "http://localhost:3000/api/modificarEmpleado",
    data: {
      _id: ie_id,
      nombre: ie_nombre,
      apellido1: ie_apellido1,
      apellido2: ie_apellido2,
      correo: ie_correo,
    },
  })
    .then(() => {
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
    })
    .catch((error) => {
      console.log(error);
    });
};

const modificar_contrasenna_empleado = async (ie_id, ie_contrasenna) => {
  await axios({
    method: "put",
    url: "http://localhost:3000/api/registroContrasennaEmpleado",
    data: {
      _id: ie_id,
      contrasenna: ie_contrasenna,
    },
  })
    .then(() => {
      setTimeout(() => {
        window.location.href = "modificar-empresa.html";
      }, 1000);
    })
    .catch((error) => {
      console.log(error);
    });
};

const eliminar_persona = async (ie_id) => {
  await axios({
    method: "delete",
    url: "http://localhost:3000/api/invitarEmpleado",
    data: {
      _id: ie_id,
    },
    responseType: "json",
  })
    .then((res) => {
      Swal.fire({
        title: "Operación exitosa",
        text: "Empleado eliminado exitosamente",
        icon: "success",
      });
    })
    .then(() => {
      setTimeout(() => {
        window.location.href = "administrar-empleados.html";
      }, 1000);
    })
    .catch((err) => {
      console.log(err);
  });
};
