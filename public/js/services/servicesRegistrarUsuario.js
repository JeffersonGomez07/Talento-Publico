const registrar_usuario = async (
  ru_nombre,
  ru_apellido1,
  ru_genero,
  ru_apellido2,
  ru_correo,
  ru_contrasenna,
  ru_fotoPerfil,
  ru_curriculum,

  ru_EstudiosNombre1,
  ru_EstudiosUniversidad1,
  ru_EstudiosInicio1,
  ru_EstudiosFinalizacion1,

  ru_EstudiosNombre2,
  ru_EstudiosUniversidad2,
  ru_EstudiosInicio2,
  ru_EstudiosFinalizacion2,

  ru_EstudiosNombre3,
  ru_EstudiosUniversidad3,
  ru_EstudiosInicio3,
  ru_EstudiosFinalizacion3,

  ru_ExperienciaEmpresa1,
  ru_ExperienciaPuesto1,
  ru_ExperienciaInicioEmp1,
  ru_ExperienciaFinalEmp1,

  ru_ExperienciaEmpresa2,
  ru_ExperienciaPuesto2,
  ru_ExperienciaInicioEmp2,
  ru_ExperienciaFinalEmp2,

  ru_ExperienciaEmpresa3,
  ru_ExperienciaPuesto3,
  ru_ExperienciaInicioEmp3,
  ru_ExperienciaFinalEmp3
) => {
  await axios({
    method: "post",
    url: "http://localhost:3000/api/registrarUsuario",
    responseType: "json",
    data: {
      nombre: ru_nombre,
      apellido1: ru_apellido1,
      genero: ru_genero,
      apellido2: ru_apellido2,
      correo: ru_correo,
      contrasenna: ru_contrasenna,
      fotoPerfil: ru_fotoPerfil,
      curriculum: ru_curriculum,

      estudios: [
        {
          estudio: ru_EstudiosNombre1,
          universidad: ru_EstudiosUniversidad1,
          annoInicio: ru_EstudiosInicio1,
          annoFinalizacion: ru_EstudiosFinalizacion1,
        },
        {
          estudio: ru_EstudiosNombre2,
          universidad: ru_EstudiosUniversidad2,
          annoInicio: ru_EstudiosInicio2,
          annoFinalizacion: ru_EstudiosFinalizacion2,
        },
        {
          estudio: ru_EstudiosNombre3,
          universidad: ru_EstudiosUniversidad3,
          annoInicio: ru_EstudiosInicio3,
          annoFinalizacion: ru_EstudiosFinalizacion3,
        },
      ],

      experiencias: [
        {
          empresa: ru_ExperienciaEmpresa1,
          puesto: ru_ExperienciaPuesto1,
          annoInicioEmp: ru_ExperienciaInicioEmp1,
          annoFinalizacionEmp: ru_ExperienciaFinalEmp1,
        },
        {
          empresa: ru_ExperienciaEmpresa2,
          puesto: ru_ExperienciaPuesto2,
          annoInicioEmp: ru_ExperienciaInicioEmp2,
          annoFinalizacionEmp: ru_ExperienciaFinalEmp2,
        },
        {
          empresa: ru_ExperienciaEmpresa3,
          puesto: ru_ExperienciaPuesto3,
          annoInicioEmp: ru_ExperienciaInicioEmp3,
          annoFinalizacionEmp: ru_ExperienciaFinalEmp3,
        },
      ],
    },
  })
    .then((res) => {
      if (res.data.resultado == false) {
        switch (res.data.error.code) {
          case 11000:
            Swal.fire({
              title: "No se completó el registro",
              text: "El correo ya está registrado",
              icon: "warning",
            });
            break;
          default:
            Swal.fire({
              title: "Error en el registro",
              text: "Ocurrió un error al registrar al usuario",
              icon: "error",
            });
        }
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

const listar_usuarios_BD = async () => {
  let lista_usuarios = [];
  await axios({
    method: "get",
    url: "http://localhost:3000/api/VerUsuarios",
    responseType: "json",
  })
    .then((res) => {
      // console.log(res.data.resultado[0]);
      lista_usuarios = res.data.resultado;
    })
    .catch((error) => {
      console.log(error);
    });

  return lista_usuarios; // Corregir el retorno aquí
};

const obtener_usuario_por_id = async (id) => {
  let usuario;

  try {
    const respuesta = await axios({
      method: "get",
      params: { id: id },
      url: "http://localhost:3000/api/buscarUsuarioPorId",
      responseType: "json",
    });

    usuario = respuesta.data.usuario;
  } catch (error) {
    console.log(error);
  }

  return usuario;
};

const modificar_usuario = async (
  mu_id,
  mu_nombre,
  mu_apellido1,
  mu_genero,
  mu_apellido2,
  mu_correo,
  mu_fotoPerfil,

  mu_EstudiosNombre1,
  mu_EstudiosUniversidad1,
  mu_EstudiosInicio1,
  mu_EstudiosFinalizacion1,

  mu_EstudiosNombre2,
  mu_EstudiosUniversidad2,
  mu_EstudiosInicio2,
  mu_EstudiosFinalizacion2,

  mu_EstudiosNombre3,
  mu_EstudiosUniversidad3,
  mu_EstudiosInicio3,
  mu_EstudiosFinalizacion3,

  mu_ExperienciaEmpresa1,
  mu_ExperienciaPuesto1,
  mu_ExperienciaInicioEmp1,
  mu_ExperienciaFinalEmp1,

  mu_ExperienciaEmpresa2,
  mu_ExperienciaPuesto2,
  mu_ExperienciaInicioEmp2,
  mu_ExperienciaFinalEmp2,

  mu_ExperienciaEmpresa3,
  mu_ExperienciaPuesto3,
  mu_ExperienciaInicioEmp3,
  mu_ExperienciaFinalEmp3
) => {
  await axios({
    method: "put",
    url: "http://localhost:3000/api/registroDatosUsuario",
    data: {
      _id: mu_id,
      nombre: mu_nombre,
      apellido1: mu_apellido1,
      genero: mu_genero,
      apellido2: mu_apellido2,
      correo: mu_correo,
      fotoPerfil: mu_fotoPerfil,

      estudios: [
        {
          estudio: mu_EstudiosNombre1,
          universidad: mu_EstudiosUniversidad1,
          annoInicio: mu_EstudiosInicio1,
          annoFinalizacion: mu_EstudiosFinalizacion1,
        },
        {
          estudio: mu_EstudiosNombre2,
          universidad: mu_EstudiosUniversidad2,
          annoInicio: mu_EstudiosInicio2,
          annoFinalizacion: mu_EstudiosFinalizacion2,
        },
        {
          estudio: mu_EstudiosNombre3,
          universidad: mu_EstudiosUniversidad3,
          annoInicio: mu_EstudiosInicio3,
          annoFinalizacion: mu_EstudiosFinalizacion3,
        },
      ],

      experiencias: [
        {
          empresa: mu_ExperienciaEmpresa1,
          puesto: mu_ExperienciaPuesto1,
          annoInicioEmp: mu_ExperienciaInicioEmp1,
          annoFinalizacionEmp: mu_ExperienciaFinalEmp1,
        },
        {
          empresa: mu_ExperienciaEmpresa2,
          puesto: mu_ExperienciaPuesto2,
          annoInicioEmp: mu_ExperienciaInicioEmp2,
          annoFinalizacionEmp: mu_ExperienciaFinalEmp2,
        },
        {
          empresa: mu_ExperienciaEmpresa3,
          puesto: mu_ExperienciaPuesto3,
          annoInicioEmp: mu_ExperienciaInicioEmp3,
          annoFinalizacionEmp: mu_ExperienciaFinalEmp3,
        },
      ],
    },
  })
    .then(() => {
      setTimeout(() => {
        window.location.href = "panel-usuario.html";
      }, 1000);
    })
    .catch((error) => {
      console.log(error);
    });
};

const modificar_contrasenna = async (ie_id, ie_contrasenna) => {
  await axios({
    method: "put",
    url: "http://localhost:3000/api/registroContrasennaUsuario",
    data: {
      _id: ie_id,
      contrasenna: ie_contrasenna,
    },
  })
    .then(() => {
      setTimeout(() => {
        window.location.href = "panel-usuario.html";
      }, 1000);
    })
    .catch((error) => {
      console.log(error);
    });
};

const registrar_aplicar = async (
  a_puesto,
  a_empresa,
  a_ubicacion,
  a_nombre,
  a_apellido1,
  a_apellido2,
  a_correo,

  a_EstudiosNombre1,
  a_EstudiosUniversidad1,
  a_EstudiosInicio1,
  a_EstudiosFinalizacion1,

  a_EstudiosNombre2,
  a_EstudiosUniversidad2,
  a_EstudiosInicio2,
  a_EstudiosFinalizacion2,

  a_EstudiosNombre3,
  a_EstudiosUniversidad3,
  a_EstudiosInicio3,
  a_EstudiosFinalizacion3,

  a_ExperienciaEmpresa1,
  a_ExperienciaPuesto1,
  a_ExperienciaInicioEmp1,
  a_ExperienciaFinalEmp1,

  a_ExperienciaEmpresa2,
  a_ExperienciaPuesto2,
  a_ExperienciaInicioEmp2,
  a_ExperienciaFinalEmp2,

  a_ExperienciaEmpresa3,
  a_ExperienciaPuesto3,
  a_ExperienciaInicioEmp3,
  a_ExperienciaFinalEmp3
) => {
  await axios({
    method: "post",
    url: "http://localhost:3000/api/aplicar",
    responseType: "json",
    data: {
      puesto: a_puesto,
      empresa: a_empresa,
      ubicacion: a_ubicacion,
      nombre: a_nombre,
      apellido1: a_apellido1,
      apellido2: a_apellido2,
      correo: a_correo,

      estudios: [
        {
          estudio: a_EstudiosNombre1,
          universidad: a_EstudiosUniversidad1,
          annoInicio: a_EstudiosInicio1,
          annoFinalizacion: a_EstudiosFinalizacion1,
        },
        {
          estudio: a_EstudiosNombre2,
          universidad: a_EstudiosUniversidad2,
          annoInicio: a_EstudiosInicio2,
          annoFinalizacion: a_EstudiosFinalizacion2,
        },
        {
          estudio: a_EstudiosNombre3,
          universidad: a_EstudiosUniversidad3,
          annoInicio: a_EstudiosInicio3,
          annoFinalizacion: a_EstudiosFinalizacion3,
        },
      ],

      experiencias: [
        {
          empresa: a_ExperienciaEmpresa1,
          puesto: a_ExperienciaPuesto1,
          annoInicioEmp: a_ExperienciaInicioEmp1,
          annoFinalizacionEmp: a_ExperienciaFinalEmp1,
        },
        {
          empresa: a_ExperienciaEmpresa2,
          puesto: a_ExperienciaPuesto2,
          annoInicioEmp: a_ExperienciaInicioEmp2,
          annoFinalizacionEmp: a_ExperienciaFinalEmp2,
        },
        {
          empresa: a_ExperienciaEmpresa3,
          puesto: a_ExperienciaPuesto3,
          annoInicioEmp: a_ExperienciaInicioEmp3,
          annoFinalizacionEmp: a_ExperienciaFinalEmp3,
        },
      ],
    },
  })
    .then((res) => {
      if (res.data.resultado == false) {
        switch (res.data.error.code) {
          case 11000:
            Swal.fire({
              title: "No se completó el registro",
              text: "El correo ya está registrado",
              icon: "warning",
            });
            break;
          default:
            Swal.fire({
              title: "Error en el registro",
              text: "Ocurrió un error al registrar al usuario",
              icon: "error",
            });
        }
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

const listar_aplicaciones_BD = async () => {
  let lista_aplicaciones = [];
  await axios({
    method: "get",
    url: "http://localhost:3000/api/listaAplicaciones",
    responseType: "json",
  })
    .then((res) => {
      //console.log(res.data.resultado[0])
      lista_aplicaciones = res.data.resultado;
    })
    .catch((error) => {
      console.log(error);
    });

  return lista_aplicaciones;
};

const obtener_aplicacion_por_id = async (id) => {
  let aplicacion;

  try {
    const respuesta = await axios({
      method: "get",
      params: { id: id },
      url: "http://localhost:3000/api/buscarAplicacionPorId",
      responseType: "json",
    });

    aplicacion = respuesta.data.aplicacion;
  } catch (error) {
    console.log(error);
  }

  return aplicacion;
};

const modificar_aplicacion = async (a_id, a_aplicacion) => {
  await axios({
    method: "put",
    url: "http://localhost:3000/api/modificarEstadoAplicacion",
    data: {
      _id: a_id,
      estado: a_aplicacion,
    },
  })
    .then((res) => {
      Swal.fire({
        title: "Operación exitosa",
        text: "Aplicacion actualizada exitosamente",
        icon: "success",
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

const eliminar_aplicacion = async (ie_id) => {
  await axios({
    method: "delete",
    url: "http://localhost:3000/api/eliminarAplicacion",
    data: {
      _id: ie_id,
    },
    responseType: "json",
  })
    .then((res) => {
      Swal.fire({
        title: "Operación exitosa",
        text: "Aplicacion eliminada exitosamente",
        icon: "success",
      });
    })
    .then(() => {
      setTimeout(() => {
        window.location.href = "revisar-aplicaciones.html";
      }, 1000);
    })
    .catch((err) => {
      console.log(err);
    });
};
