const invitarPuesto = async (re_correo, re_puesto, re_ubicacion) => {
  console.log("Enviando correo a:", re_correo);
  console.log("Puesto:", re_puesto);
  console.log("Ubi:", re_ubicacion);

  try {
    const response = await axios({
      method: "post",
      url: "http://localhost:3000/api/invitarPuesto",
      responseType: "json",
      data: {
        correo: re_correo,
        puesto: re_puesto,
        ubicacion: re_ubicacion
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
      text: "Hubo un error al invitar al puesto",
      icon: "error",
    });
  }
};
