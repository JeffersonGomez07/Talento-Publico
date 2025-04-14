let empleadoID = sessionStorage.getItem("Usuario ID");
const tbody = document.querySelector("#informacion-puesto");

let lista_puestos = [];

function crear_botones(fila, i) {
  //crear un boton de editar para cada registro
  let celda_acciones = fila.insertCell();
  //crear un boton
  let boton_invitar = document.createElement("button");
  //afectar el contenido del botón
  boton_invitar.innerHTML = '<img src="/public/img/imgIconoInvitar.png" alt="Icono invitar">';
  boton_invitar.classList.add("btnInvitar");


  boton_invitar.addEventListener("click", () => {
    localStorage.setItem("id_puestoSelected", lista_puestos[i]._id);
    window.location.href = "filtrar-usuarios.html";
  });

  celda_acciones.appendChild(boton_invitar);
}

const mostrar_datos_en_tabla = async (empresa) => {
  const empleado_empresa= async () => {
    let empresa = await obtener_empleado_por_id(empleadoID);
    return empresa.empresa_empleado; // Devuelve el nombre de la empresa
  };

  let empresaEmpleado = await empleado_empresa();

  lista_puestos = await listar_puestos_BD(empresa);

  tbody.innerHTML = "";
  document.getElementById("informacion-puesto").innerHTML =
    "<tr>" +
    "<th>Puesto</th>" +
    "<th>Ubicacion</th>" +
    "<th>Vista</th>" +
    "<th>Acciones</th>" +
    "</tr>";

  for (let i = 0; i < lista_puestos.length; i++) {
    if (lista_puestos[i]["empresa_puesto"] === empresaEmpleado) {
      let fila = tbody.insertRow();

    let celda_puesto = fila.insertCell();
    celda_puesto.innerHTML = lista_puestos[i]["puesto"];

    let celda_ubicacion = fila.insertCell();
    celda_ubicacion.innerHTML = lista_puestos[i]["canton"];

    let celda_vista = fila.insertCell();
    celda_vista.innerHTML = lista_puestos[i]["visibilidad"];

    crear_botones(fila, i);
    }
  }
};

mostrar_datos_en_tabla();
