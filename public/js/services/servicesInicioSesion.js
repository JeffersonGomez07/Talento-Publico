const validar_persona = async (pcorreo, pcontrasenna) => {
  await axios({
    method: "post",
    url: "http://localhost:3000/api/validarCredenciales",
    responseType: "json",
    data: {
      correo: pcorreo,
      contrasenna: pcontrasenna,
    },
  }).then((res) => {
    if (res.data.resultado == false) {
      Swal.fire({
        title: "Datos Incorrectos",
        text: res.data.msg,
        icon: "error",
      });
    } else {
      sessionStorage.setItem("conectado", res.data.resultado);
      sessionStorage.setItem("Tipo de usuario", res.data.usuario.tipoUsuario);
      sessionStorage.setItem("Usuario ID", res.data.usuario._id); // Agregar esta línea
      console.log("Resultado:", res.data.resultado);
      console.log("Usuario:", res.data.tipoUsuario);
      let rol = sessionStorage.getItem("Tipo de usuario");
      if (rol == "Administrador") {
        window.location.href = "homepage-admin.html";
      } else if (rol == "Manager") {
        window.location.href = "homepage-manager.html";
      } else if (rol == "Reclutador") {
        window.location.href = "homepage-reclutador.html";
      } else if (rol == "Usuario"){
        window.location.href = "homepage-usuario.html";
      }
    }
  });
};
