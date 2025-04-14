//registrar una persona
const crear_puesto = async (
  cp_puesto,
  cp_slctHorario,
  cp_slctSalario,
  cp_slctResponsabilidad,
  cp_slctProvincia,
  cp_txtAptitudes,
  cp_txtHabilidades,
  cp_txtCanton,
  cp_slctVisibilidad,
  cp_txtDetail,
  cp_txtBeneficios,
  cp_txtResponsabilidades,
  cp_txtEmpresa
) => {
  await axios({
    method: "post",
    url: "http://localhost:3000/api/crearPuesto",
    responseType: "json",
    data: {
      puesto: cp_puesto,
      horario: cp_slctHorario,
      salario: cp_slctSalario,
      responsabilidad: cp_slctResponsabilidad,
      provincia: cp_slctProvincia,
      canton: cp_txtCanton,
      visibilidad: cp_slctVisibilidad,
      aptitudes: cp_txtAptitudes,
      habilidades: cp_txtHabilidades,
      detalles: cp_txtDetail,
      beneficios: cp_txtBeneficios,
      responsabilidades: cp_txtResponsabilidades,
      empresa_puesto: cp_txtEmpresa,
    },
  })
    .then((res) => {
      if (res.data.resultado == false) {
        switch (res.data.error.code) {
          case 11000:
            Swal.fire({
              title: "No se completó el registro del puesto",
              text: "El puesto ya está registrado",
              icon: "warning",
            });
            break;
        }
      } else {
        Swal.fire({
          title: "Puesto registrado exitosamente",
          icon: "success",
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

//listar puestos
const listar_puestos_BD = async () => {
  let lista_puestos = [];
  await axios({
    method: "get",
    url: "http://localhost:3000/api/crearPuesto",
    responseType: "json",
  })
    .then((res) => {
      // console.log(res.data.resultado[0]);
      lista_puestos = res.data.resultado;
    })
    .catch((error) => {
      console.log(error);
    });

  return lista_puestos; // Corregir el retorno aquí
};

const obtener_puesto_por_id = async (id) => {
  let puesto;

  try {
    const respuesta = await axios({
      method: "get",
      params: { id: id },
      url: "http://localhost:3000/api/buscarPuestoPorId",
      responseType: "json",
    });

    puesto = respuesta.data.puesto;
  } catch (error) {
    console.log(error);
  }

  return puesto;
};

const listar_puestos_porID = async (_id) => {
  let lista_puestos = [];
  console.log("lista de empresas:");
  console.log(lista_puestos);
  await axios({
    method: "get",
    url: "http://localhost:3000/api/crearPuesto",
    responseType: "json",
  })
    .then((res) => {
      console.log(res.data.resultado[0]);
      lista_puestos = res.data.resultado;
    })
    .catch((error) => {
      console.log(error);
    });
  if (_id) {
    lista_puestos = lista_puestos.filter((puesto) => puesto._id === _id);
  }
  return lista_puestos;
};

// modificar puestos
const modificar_puesto = async (
  cp_puesto,
  cp_slctHorario,
  cp_slctSalario,
  cp_slctResponsabilidad,
  cp_slctProvincia,
  cp_txtAptitudes,
  cp_txtHabilidades,
  cp_txtCanton,
  cp_slctVisibilidad,
  cp_txtDetail,
  cp_txtBeneficios,
  cp_txtResponsabilidades,
  cp_id
) => {
  await axios({
    method: "put",
    url: "http://localhost:3000/api/crearPuesto",
    responseType: "json",
    data: {
      puesto: cp_puesto,
      horario: cp_slctHorario,
      salario: cp_slctSalario,
      responsabilidad: cp_slctResponsabilidad,
      provincia: cp_slctProvincia,
      canton: cp_txtCanton,
      visibilidad: cp_slctVisibilidad,
      aptitudes: cp_txtAptitudes,
      habilidades: cp_txtHabilidades,
      detalles: cp_txtDetail,
      beneficios: cp_txtBeneficios,
      responsabilidades: cp_txtResponsabilidades,
      _id: cp_id,
    },
  })
    .then((res) => {
      if (res.data.resultado == false) {
        switch (res.data.error.code) {
          case 11000:
            Swal.fire({
              title: "No se completó el registro del puesto",
              text: "El puesto ya está registrado",
              icon: "warning",
            });
            break;
        }
      } else {
        setTimeout(() => {
          window.location.href = "administrar-puestos.html";
        }, 1000);      }
    })
    .catch((error) => {
      console.log(error);
    });
};

const eliminar_puesto = async (ie_id) => {
  await axios({
    method: "delete",
    url: "http://localhost:3000/api/crearPuesto",
    data: {
      _id: ie_id,
    },
    responseType: "json",
  })
    .then((res) => {
      Swal.fire({
        title: "Operación exitosa",
        text: "Puesto eliminado exitosamente",
        icon: "success",
      });
    })
    .then(() => {
      setTimeout(() => {
        window.location.href = "administrar-puestos.html";
      }, 1000);
    })
    .catch((err) => {
      console.log(err);
    });
};
