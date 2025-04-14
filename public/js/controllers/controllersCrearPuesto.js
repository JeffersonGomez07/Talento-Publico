let empresaID = sessionStorage.getItem("Usuario ID");

const btnPublicar = document.getElementById("btnPublicar");
const btnCancelar = document.getElementById("btnCancelar");
const txtPuesto = document.getElementById("txtPuesto");
const slctHorario = document.getElementById("slctHorario");
const slctSalario = document.getElementById("slctSalario");
const slctResponsabilidad = document.getElementById("slctResponsabilidad");
const txtAptitudes = document.getElementById("txtAptitudes");
const txtHabilidades = document.getElementById("txtHabilidades");
const txtCanton = document.getElementById("txtCanton");
const slctProvincia = document.getElementById("slctProvincia");
const slctVisibilidad = document.getElementById("slctVisibilidad");
const txtDetalles = document.getElementById("txtDetail");
const txtBeneficios = document.getElementById("txtBeneficios");
const txtResponsabilidades = document.getElementById("txtResponsabilidades");

async function nombre_empresa(empresaID) {
  try {
    const empleado = await obtener_empleado_por_id(empresaID);
    if (empleado) {
      return empleado.empresa_empleado;
    } else {
      throw new Error("No se pudo obtener el nombre de la empresa");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

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

async function enviar_datos() {
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
    const empresaID = sessionStorage.getItem("Usuario ID");
    const Empresa = await nombre_empresa(empresaID);
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

    crear_puesto(
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
      Empresa
    );

    limpiar_datos();
  }
}

function cancelar_datos() {
  Swal.fire({
    icon: "error",
    title: "Registro cancelado",
    text: "Se borrarán los datos",
  });
  txtPuesto.classList.remove("error");
  slctHorario.classList.remove("error");
  txtAptitudes.classList.remove("error");
  txtHabilidades.classList.remove("error");
  txtCanton.classList.remove("error");
  slctVisibilidad.classList.remove("error");
  txtDetalles.classList.remove("error");
  txtBeneficios.classList.remove("error");
  txtResponsabilidades.classList.remove("error");
  slctSalario.classList.remove("error");
  slctProvincia.classList.remove("error");
  slctResponsabilidad.classList.remove("error");
  limpiar_datos();
}

// Asociar un evento al botón
btnPublicar.addEventListener("click", enviar_datos);
btnCancelar.addEventListener("click", cancelar_datos);
