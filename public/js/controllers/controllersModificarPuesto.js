let empresaID = sessionStorage.getItem("Usuario ID");
let puestoID = localStorage.getItem("id_puesto");

const btnPublicar = document.getElementById("btnPublicar");
const btnCancelar = document.getElementById("btnCancelar");
let txtPuesto = document.getElementById("txtPuesto");
let slctHorario = document.getElementById("slctHorario");
let slctSalario = document.getElementById("slctSalario");
let slctResponsabilidad = document.getElementById("slctResponsabilidad");
let txtAptitudes = document.getElementById("txtAptitudes");
let txtHabilidades = document.getElementById("txtHabilidades");
let txtCanton = document.getElementById("txtCanton");
let slctProvincia = document.getElementById("slctProvincia");
let slctVisibilidad = document.getElementById("slctVisibilidad");
let txtDetalles = document.getElementById("txtDetail");
let txtBeneficios = document.getElementById("txtBeneficios");
let txtResponsabilidades = document.getElementById("txtResponsabilidades");

console.log(puestoID)



function puesto_id() {
    return listar_puestos_porID(puestoID)
      .then((id) => {
        let puesto_id = id[0]._id;
        console.log(puesto_id);
        return puesto_id;
      })
      .catch((error) => {
        console.error("Error in puesto_id:", error);
        throw error; // Rethrow the error to handle it at the caller level
      });
}

const llenar_campos = async () => {
  let puestos = await listar_puestos_porID(puestoID);
  _id = puestos[0]._id;

  console.log(puestos);

  txtPuesto.value = puestos[0].puesto;
  slctHorario.value = puestos[0].horario;
  slctSalario.value = puestos[0].salario;
  slctResponsabilidad.value = puestos[0].responsabilidad;
  txtAptitudes.value = puestos[0].aptitudes;
  txtHabilidades.value = puestos[0].habilidades;
  txtCanton.value = puestos[0].canton;
  slctProvincia.value = puestos[0].provincia;
  slctVisibilidad.value = puestos[0].visibilidad;
  txtDetalles.value = puestos[0].detalles;
  txtBeneficios.value = puestos[0].beneficios;
  txtResponsabilidades.value = puestos[0].responsabilidades;
};

// Crear una función para validar campos vacíos
function validar_campos_vacios() {
  let error = false; // asumir que al inicio no hay errores
  let campos_requeridos = document.querySelectorAll(
    "#formDatosPuesto [required]"
  );
  for (let i = 0; i < campos_requeridos.length; i++) {
    if (campos_requeridos[i].value === "") {
      campos_requeridos[i].classList.add("error");
      error = true;
    } else {
      campos_requeridos[i].classList.remove("error");
    }
  }
  return error;
}
function validar_puesto() {
  let error = false;
  let texto = txtPuesto.value; //en la variable texto se guarda el texto que el usuario
  //validar usando expresiones regulares
  let regex = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/;
  if (regex.test(texto) == false) {
    txtPuesto.classList.add("error");
    error = true;
  } else {
    txtPuesto.classList.remove("error");
  }
  return error;
}

function validar_aptitudes() {
  let error = false;
  let texto = txtAptitudes.value; //en la variable texto se guarda el texto que el usuario
  //validar usando expresiones regulares
  let regex = /^(?:[a-zA-ZñÑáéíóúÁÉÍÓÚ]+\s*,\s*)*[a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/;
  if (regex.test(texto) == false) {
    txtAptitudes.classList.add("error");
    error = true;
  } else {
    txtAptitudes.classList.remove("error");
  }
  return error;
}

function validar_habilidades() {
  let error = false;
  let texto = txtHabilidades.value; //en la variable texto se guarda el texto que el usuario
  //validar usando expresiones regulares
  let regex = /^(?:[a-zA-ZñÑáéíóúÁÉÍÓÚ]+\s*,\s*)*[a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/;
  if (regex.test(texto) == false) {
    txtHabilidades.classList.add("error");
    error = true;
  } else {
    txtHabilidades.classList.remove("error");
  }
  return error;
}

function validar_canton() {
  let error = false;
  let texto = txtCanton.value; //en la variable texto se guarda el texto que el usuario
  //validar usando expresiones regulares
  let regex = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/;
  if (regex.test(texto) == false) {
    txtCanton.classList.add("error");
    error = true;
  } else {
    txtCanton.classList.remove("error");
  }
  return error;
}

function validar_detalles() {
  let error = false;
  let texto = txtDetalles.value; //en la variable texto se guarda el texto que el usuario
  //validar usando expresiones regulares
  let regex = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ,.\s]+$/g;
  if (regex.test(texto) == false) {
    txtDetalles.classList.add("error");
    error = true;
  } else {
    txtDetalles.classList.remove("error");
  }
  return error;
}

function validar_beneficios() {
  let error = false;
  let texto = txtBeneficios.value; //en la variable texto se guarda el texto que el usuario
  //validar usando expresiones regulares
  let regex = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ,.\s]+$/g;
  if (regex.test(texto) == false) {
    txtBeneficios.classList.add("error");
    error = true;
  } else {
    txtBeneficios.classList.remove("error");
  }
  return error;
}

function validar_responsabilidades() {
  let error = false;
  let texto = txtResponsabilidades.value; //en la variable texto se guarda el texto que el usuario
  //validar usando expresiones regulares
  let regex = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ,.\s]+$/g;
  if (regex.test(texto) == false) {
    txtResponsabilidades.classList.add("error");
    error = true;
  } else {
    txtResponsabilidades.classList.remove("error");
  }
  return error;
}

function limpiar_datos() {
  txtPuesto.value = "";
  txtAptitudes.value = "";
  txtHabilidades.value = "";
  txtCanton.value = "";

  txtDetail.value = "";
  txtBeneficios.value = "";
  txtResponsabilidades.value = "";
  document.getElementById("slctHorario").value = "null";
  document.getElementById("slctSalario").value = "null";
  document.getElementById("slctResponsabilidad").value = "null";
  document.getElementById("slctProvincia").value = "null";
  document.getElementById("slctVisibilidad").value = "null";
}

function mostrar_alerta_exitosa(mensaje) {
  Swal.fire({
    icon: "success",
    title: "¡Puesto actualizado!",
    text: mensaje,
    showConfirmButton: false,
    timer: 2000,
  });
}

function enviar_datos() {
  let error_campos_vacios = validar_campos_vacios();
  let error_puesto = validar_puesto();
  let error_aptitudes = validar_aptitudes();
  let error_habilidades = validar_habilidades();
  let error_canton = validar_canton();
  let error_detalles = validar_detalles();
  let error_beneficios = validar_beneficios();
  let error_responsabilidades = validar_responsabilidades();

  if (error_campos_vacios) {
    Swal.fire({
      icon: "warning",
      title: "Se encontraron campos vacios",
      text: "Por favor completa los campos señalados",
    });
  } else if (error_puesto) {
    Swal.fire({
      icon: "warning",
      title: "Puesto inválido",
      text: "El campo puesto solo puede contener letras",
    });
  } else if (error_aptitudes) {
    Swal.fire({
      icon: "warning",
      title: "Aptitudes inválidas",
      text: "El campo aptitudes solo puede contener letras, si deseas agregar más de una sigue el formato: Aptitud, aptitud, aptitud",
    });
  } else if (error_habilidades) {
    Swal.fire({
      icon: "warning",
      title: "Habilidades inválidas",
      text: "El campo Habilidades solo puede contener letras, si deseas agregar más de una sigue el formato: Habilidad, habilidad, habilidad",
    });
  } else if (error_canton) {
    Swal.fire({
      icon: "warning",
      title: "Cantón inválido",
      text: "El campo cantón solo puede contener letras",
    });
  } else if (error_detalles) {
    Swal.fire({
      icon: "warning",
      title: "Acerca del empleo inválido",
      text: "El campo acerca del empleo solo puede contener letras",
    });
  } else if (error_beneficios) {
    Swal.fire({
      icon: "warning",
      title: "Beneficios inválidos",
      text: "El campo beneficios solo puede contener letras.",
    });
  } else if (error_responsabilidades) {
    Swal.fire({
      icon: "warning",
      title: "Responsabilidades inválidas",
      text: "El campo responsabilidades solo puede contener letras.",
    });
  } else {
    puesto_id()
      .then((_id) => {
        let Puesto = txtPuesto.value;
        let Horario = slctHorario.value;
        let Salario = slctSalario.value;
        let Responsabilidad = slctResponsabilidad.value;
        let Provincia = slctProvincia.value;
        let Aptitudes = txtAptitudes.value;
        let Habilidades = txtHabilidades.value;
        let Canton = txtCanton.value;
        let Visibilidad = slctVisibilidad.value;
        let Detalles = txtDetalles.value;
        let Beneficios = txtBeneficios.value;
        let Responsabilidades = txtResponsabilidades.value;

        modificar_puesto(
          Puesto,
          Horario,
          Salario,
          Responsabilidad,
          Provincia,
          Aptitudes,
          Habilidades,
          Canton,
          Visibilidad,
          Detalles,
          Beneficios,
          Responsabilidades,
          _id,
        );

        mostrar_alerta_exitosa("Haz modificado el puesto correctamente!");
        limpiar_datos();
      })
      .catch((error) => {
        console.error(error);
      });
  }
}

function cancelar_datos() {
  window.location.href = "administrar-puestos.html";
  limpiar_datos();
}

puesto_id()

// Asociar un evento al botón
btnPublicar.addEventListener("click", enviar_datos);
btnCancelar.addEventListener("click", cancelar_datos);

llenar_campos();