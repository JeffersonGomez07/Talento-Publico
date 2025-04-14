const idUsuario = localStorage.getItem("id_usuario");

// Función para llenar los elementos con los datos del usuario
const llenarDatosAplicacion = async () => {
  const usuario = await obtener_usuario_por_id(idUsuario); // Utiliza la función que definiste antes

  if (usuario) {
    const nombreempresa1 = document.getElementById("nombreempresa1");
    const nombrepuesto1 = document.getElementById("nombrepuesto1");
    const fechainicioemp1 = document.getElementById("fechainicioemp1");
    const fechafinalemp1 = document.getElementById("fechafinalemp1");

    const nombreempresa2 = document.getElementById("nombreempresa2");
    const nombrepuesto2 = document.getElementById("nombrepuesto2");
    const fechainicioemp2 = document.getElementById("fechainicioemp2");
    const fechafinalemp2 = document.getElementById("fechafinalemp2");

    const nombreempresa3 = document.getElementById("nombreempresa3");
    const nombrepuesto3 = document.getElementById("nombrepuesto3");
    const fechainicioemp3 = document.getElementById("fechainicioemp3");
    const fechafinalemp3 = document.getElementById("fechafinalemp3");

    const espacioExp2 = document.getElementsByClassName("espacioexp2");
    const espacioExp3 = document.getElementsByClassName("espacioexp3");

    const primerExperiencia = usuario.experiencias[0];
    const segundoExperiencia = usuario.experiencias[1];
    const tercerExperiencia = usuario.experiencias[2];

    //Experiencias
    nombreempresa1.textContent = primerExperiencia.empresa;
    nombrepuesto1.textContent = primerExperiencia.puesto;
    fechainicioemp1.textContent = primerExperiencia.annoInicioEmp;
    fechafinalemp1.textContent = primerExperiencia.annoFinalizacionEmp;

    if (
      segundoExperiencia.empresa === "" &&
      segundoExperiencia.puesto === "" &&
      segundoExperiencia.annoInicioEmp === "" &&
      segundoExperiencia.annoFinalizacionEmp === ""
    ) {
      for (const element of espacioExp2) {
        element.style.display = "none";
      }
      nombreempresa2.textContent = segundoExperiencia.empresa;
      nombrepuesto2.textContent = segundoExperiencia.puesto;
      fechainicioemp2.textContent = segundoExperiencia.annoInicioEmp;
      fechafinalemp2.textContent = segundoExperiencia.annoFinalizacionEmp;
    } else {
      nombreempresa2.textContent = segundoExperiencia.empresa;
      nombrepuesto2.textContent = segundoExperiencia.puesto;
      fechainicioemp2.textContent = segundoExperiencia.annoInicioEmp;
      fechafinalemp2.textContent = segundoExperiencia.annoFinalizacionEmp;
    }

    if (
      tercerExperiencia.empresa === "" &&
      tercerExperiencia.puesto === "" &&
      tercerExperiencia.annoInicioEmp === "" &&
      tercerExperiencia.annoFinalizacionEmp === ""
    ) {
      for (const element of espacioExp3) {
        element.style.display = "none";
      }
      nombreempresa3.textContent = tercerExperiencia.empresa;
      nombrepuesto3.textContent = tercerExperiencia.puesto;
      fechainicioemp3.textContent = tercerExperiencia.annoInicioEmp;
      fechafinalemp3.textContent = tercerExperiencia.annoFinalizacionEmp;
    } else {
      nombreempresa3.textContent = tercerExperiencia.empresa;
      nombrepuesto3.textContent = tercerExperiencia.puesto;
      fechainicioemp3.textContent = tercerExperiencia.annoInicioEmp;
      fechafinalemp3.textContent = tercerExperiencia.annoFinalizacionEmp;
    }
  }
};

window.onload = llenarDatosAplicacion;
