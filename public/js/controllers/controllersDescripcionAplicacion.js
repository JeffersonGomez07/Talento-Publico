const idPuesto = localStorage.getItem("id_puesto");
const idUsuario = sessionStorage.getItem("Usuario ID")

const btnPublicar = document.getElementById("btnPublicar");
const btnCancelar = document.getElementById("btnCancelar");

const llenarDatosUsuario = async () => {
  const puesto = await obtener_puesto_por_id(idPuesto);

  if (puesto) {
    const nombrePuesto = document.getElementById("h1Title");
    //Estudios
    nombrePuesto.textContent = puesto.puesto;
  }
};

const obtenerInfoPuesto = async () => {
  const puesto = await obtener_puesto_por_id(idPuesto);

  if (puesto) {
    puestoNombre = puesto.puesto;
    empresaNombre = puesto.empresa_puesto;
    ubicacionEmpresa = puesto.provincia;
  }
};
obtenerInfoPuesto();

const obtenerInfoUsuario = async () => {
  const usuario = await obtener_usuario_por_id(idUsuario);

  if (usuario) {
    nombreUsuario = usuario.nombre;
    apellido1Usuario = usuario.apellido1;
    apellido2Usuario = usuario.apellido2;
    correoUsuario = usuario.correo;

    const primerEstudio = usuario.estudios[0];
    const segundoEstudio = usuario.estudios[1];
    const tercerEstudio = usuario.estudios[2];

    const primerExperiencia = usuario.experiencias[0];
    const segundoExperiencia = usuario.experiencias[1];
    const tercerExperiencia = usuario.experiencias[2];

    nombreestudio1 = primerEstudio.estudio;
    nombreuniversidad1 = primerEstudio.universidad;
    fechainicio1 = primerEstudio.annoInicio;
    fechafinal1 = primerEstudio.annoFinalizacion;

    nombreestudio2 = segundoEstudio.estudio;
    nombreuniversidad2 = segundoEstudio.universidad;
    fechainicio2 = segundoEstudio.annoInicio;
    fechafinal2 = segundoEstudio.annoFinalizacion;

    nombreestudio3 = tercerEstudio.estudio;
    nombreuniversidad3 = tercerEstudio.universidad;
    fechainicio3 = tercerEstudio.annoInicio;
    fechafinal3 = tercerEstudio.annoFinalizacion;

    nombreempresa1 = primerExperiencia.empresa;
    nombrepuesto1 = primerExperiencia.puesto;
    fechainicioemp1 = primerExperiencia.annoInicioEmp;
    fechafinalemp1 = primerExperiencia.annoFinalizacionEmp;

    nombreempresa2 = segundoExperiencia.empresa;
    nombrepuesto2 = segundoExperiencia.puesto;
    fechainicioemp2 = segundoExperiencia.annoInicioEmp;
    fechafinalemp2 = segundoExperiencia.annoFinalizacionEmp;

    nombreempresa3 = tercerExperiencia.empresa;
    nombrepuesto3 = tercerExperiencia.puesto;
    fechainicioemp3 = tercerExperiencia.annoInicioEmp;
    fechafinalemp3 = tercerExperiencia.annoFinalizacionEmp;
  }
};
obtenerInfoUsuario();

function enviar_datos() {
  registrar_aplicar(
    puestoNombre,
    empresaNombre,
    ubicacionEmpresa,
    nombreUsuario,
    apellido1Usuario,
    apellido2Usuario,
    correoUsuario,

    nombreestudio1,
    nombreuniversidad1,
    fechainicio1,
    fechafinal1,

    nombreestudio2,
    nombreuniversidad2,
    fechainicio2,
    fechafinal2,

    nombreestudio3,
    nombreuniversidad3,
    fechainicio3,
    fechafinal3,

    nombreempresa1,
    nombrepuesto1,
    fechainicioemp1,
    fechafinalemp1,

    nombreempresa2,
    nombrepuesto2,
    fechainicioemp2,
    fechafinalemp2,

    nombreempresa3,
    nombrepuesto3,
    fechainicioemp3,
    fechafinalemp3
  );

  Swal.fire({
    icon: "success",
    title: "Felicidades!",
    text: "Aplicaste con éxito",
    showConfirmButton: false,
    timer: 3000,
  });
  setTimeout(function () {
    window.location.href = "puestos.html";
  }, 2000);

}

function cancelar_datos() {
  localStorage.removeItem("id_puesto");
  window.location.href = "./puestos.html";
}

window.onload = llenarDatosUsuario;

// Asociar un evento al botón
btnPublicar.addEventListener("click", enviar_datos);
btnCancelar.addEventListener("click", cancelar_datos);
