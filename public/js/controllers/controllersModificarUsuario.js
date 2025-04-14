const idUsuario = sessionStorage.getItem("Usuario ID");

// Función para llenar los elementos con los datos del usuario
const llenarDatosUsuario = async () => {
  const usuario = await obtener_usuario_por_id(idUsuario); // Utiliza la función que definiste antes

  if (usuario) {
    const fotoPerfil = document.getElementById("imgPerfildeUsuario"); // Selecciona el elemento de imagen
    const nombre = document.getElementById("nombre");
    const correo = document.getElementById("correo");
    const apellido1 = document.getElementById("apellido1");
    const apellido2 = document.getElementById("apellido2");

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
    const espacioest2 = document.getElementsByClassName("espacioest2");
    const espacioest3 = document.getElementsByClassName("espacioest3");

    const primerEstudio = usuario.estudios[0];
    const segundoEstudio = usuario.estudios[1];
    const tercerEstudio = usuario.estudios[2];

    const primerExperiencia = usuario.experiencias[0];
    const segundoExperiencia = usuario.experiencias[1];
    const tercerExperiencia = usuario.experiencias[2];

    nombre.textContent = usuario.nombre;
    correo.textContent = usuario.correo;
    apellido1.textContent = usuario.apellido1;
    apellido2.textContent = usuario.apellido2;

    if (usuario.fotoPerfil === "" || usuario.fotoPerfil === "http://127.0.0.1:5502/public/img/ImgFondoBlanco.png") {
      fotoPerfil.src = "./img/imgIconoUsuarioFinal.png";
    } else {
      fotoPerfil.src = usuario.fotoPerfil;
    }

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

window.onload = llenarDatosUsuario;
