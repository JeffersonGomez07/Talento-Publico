const idUsuario = localStorage.getItem("id_usuario");

// Función para llenar los elementos con los datos del usuario
const llenarDatosAplicacion = async () => {
  const usuario = await obtener_usuario_por_id(idUsuario); // Utiliza la función que definiste antes

  if (usuario) {
    const nombreestudio1 = document.getElementById("nombreestudio1");
    const nombreuniversidad1 = document.getElementById("nombreuniversidad1");
    const fechainicio1 = document.getElementById("fechainicio1");
    const fechafinal1 = document.getElementById("fechafinal1");

    const nombreestudio2 = document.getElementById("nombreestudio2");
    const nombreuniversidad2 = document.getElementById("nombreuniversidad2");
    const fechainicio2 = document.getElementById("fechainicio2");
    const fechafinal2 = document.getElementById("fechafinal2");

    const nombreestudio3 = document.getElementById("nombreestudio3");
    const nombreuniversidad3 = document.getElementById("nombreuniversidad3");
    const fechainicio3 = document.getElementById("fechainicio3");
    const fechafinal3 = document.getElementById("fechafinal3");

    const espacioest2 = document.getElementsByClassName("espacioest2");
    const espacioest3 = document.getElementsByClassName("espacioest3");

    const primerEstudio = usuario.estudios[0];
    const segundoEstudio = usuario.estudios[1];
    const tercerEstudio = usuario.estudios[2];

    //Estudios
    nombreestudio1.textContent = primerEstudio.estudio;
    nombreuniversidad1.textContent = primerEstudio.universidad;
    fechainicio1.textContent = primerEstudio.annoInicio;
    fechafinal1.textContent = primerEstudio.annoFinalizacion;

    if (
      segundoEstudio.estudio === "" &&
      segundoEstudio.universidad === "" &&
      segundoEstudio.annoInicio === "" &&
      segundoEstudio.annoFinalizacion === ""
    ) {
      for (const element of espacioest2) {
        element.style.display = "none";
      }
      nombreestudio2.textContent = segundoEstudio.estudio;
      nombreuniversidad2.textContent = segundoEstudio.universidad;
      fechainicio2.textContent = segundoEstudio.annoInicio;
      fechafinal2.textContent = segundoEstudio.annoFinalizacion;
    } else {
      nombreestudio2.textContent = segundoEstudio.estudio;
      nombreuniversidad2.textContent = segundoEstudio.universidad;
      fechainicio2.textContent = segundoEstudio.annoInicio;
      fechafinal2.textContent = segundoEstudio.annoFinalizacion;
    }

    if (
      tercerEstudio.estudio === "" &&
      tercerEstudio.universidad === "" &&
      tercerEstudio.annoInicio === "" &&
      tercerEstudio.annoFinalizacion === ""
    ) {
      for (const element of espacioest3) {
        element.style.display = "none";
      }
      nombreestudio3.textContent = tercerEstudio.estudio;
      nombreuniversidad3.textContent = tercerEstudio.universidad;
      fechainicio3.textContent = tercerEstudio.annoInicio;
      fechafinal3.textContent = tercerEstudio.annoFinalizacion;
    } else {
      nombreestudio3.textContent = tercerEstudio.estudio;
      nombreuniversidad3.textContent = tercerEstudio.universidad;
      fechainicio3.textContent = tercerEstudio.annoInicio;
      fechafinal3.textContent = tercerEstudio.annoFinalizacion;
    }
  }
};

window.onload = llenarDatosAplicacion;