//registrar una persona
const registrar_empresa = async (
  re_nombreEmpresa,
  re_correoEmpresa,
  re_contrasennaEmpresa,
  re_foto
) => {
  await axios({
    method: "post",
    url: "http://localhost:3000/api/registroEmpresa",
    responseType: "json",
    data: {
      nombre: re_nombreEmpresa,
      correo: re_correoEmpresa,
      contrasenna: re_contrasennaEmpresa,
      fotoPerfil: re_foto,
    },
  })
    .then((res) => {
      if (res.data.resultado == false) {
        switch (res.data.error.code) {
          case 11000:
            Swal.fire({
              title: "No se completó el registro",
              text: "La empresa ya está registrada",
              icon: "warning",
            });
            break;
        }
      } else {
        //Simplemente, se ejecuta el registro
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

const informacionEmpresa = async () => {
  let info_empresa = [];

  await axios({
    method: 'get',
    url: 'http://localhost:3000/api/registroEmpresa',
    responseType: 'json'
  })
  .then((res) => {
    info_empresa = res.data.resultado;
  })
  .catch((error) => {
    console.log(error)
  });

  return info_empresa;
}


const obtener_empresa_por_id = async (id) => {
  let empresa;

  try {
    const respuesta = await axios({
      method: "get",
      params: { id: id },
      url: "http://localhost:3000/api/buscarEmpresaPorId",
      responseType: "json",
    });

    empresa = respuesta.data.empresa;
  } catch (error) {
    console.log(error);
  }

  return empresa;
};

const modificar_empresa = async (
  ie_id,
  ie_nombre,
  ie_correo,
  ie_fotoPerfil
) => {
  await axios({
    method: "put",
    url: "http://localhost:3000/api/registroDatosEmpresa",
    data: {
      _id: ie_id,
      nombre: ie_nombre,
      correo: ie_correo,
      fotoPerfil: ie_fotoPerfil,
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

const modificar_contrasenna_empresa = async (
  ie_id,
  ie_contrasenna,
) => {
  await axios({
    method: "put",
    url: "http://localhost:3000/api/registroContrasennaEmpresa",
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



