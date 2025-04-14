const tbody = document.querySelector("#informacionRevisarAplicaciones tbody");
const input_filtro = document.querySelector("#inputBuscarDateTexto");
const input_fecha = document.querySelector("#inputBuscarDate");
const btnBuscar = document.getElementById("btnBuscar");

let listado_de_aplicaciones = [];
let correoUsuario = "";

function crear_botones(fila, i) {
  let celda_acciones = fila.insertCell();
  let boton_eliminar = document.createElement("button");
  boton_eliminar.classList.add("btnEliminar");
  boton_eliminar.innerText = "Eliminar";
  boton_eliminar.addEventListener("click", () => {
    localStorage.setItem("id_mongo", listado_de_aplicaciones[i]._id);
    let id = localStorage.getItem("id_mongo");
    Swal.fire({
      title: "¿Estás seguro?",
      html: "¿De verdad quieres eliminar esta aplicacion?<br>Dejaras de ser tomado en cuenta para el puesto.",
      icon: "error",
      showCancelButton: true,
      confirmButtonColor: "#D82F2F",
      cancelButtonColor: "#6D8B74",
      confirmButtonText: "Cancelar",
      cancelButtonText: "Confirmar",
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.cancel) {
        eliminar_aplicacion(id).then(() => {
          Swal.fire("Eliminado!", "El empleado ha sido eliminado.", "success");
          setTimeout(() => {
            window.location.href = "administrar-empleados.html";
          }, 3000);
        });
      } else {
        // El usuario canceló, no hacemos nada
      }
    });
  });
  celda_acciones.appendChild(boton_eliminar);
}

const mostrar_datos_en_tabla = async () => {
  listado_de_aplicaciones = await listar_aplicaciones_BD();
  tbody.innerHTML = "";
  let usuarioID = sessionStorage.getItem("Usuario ID");
  const usuario_nombre = async () => {
    let usuario = await obtener_usuario_por_id(usuarioID);
    return usuario.correo;
  };
  correoUsuario = await usuario_nombre();
  for (let i = 0; i < listado_de_aplicaciones.length; i++) {
    if (listado_de_aplicaciones[i]["correo"] === correoUsuario) {
      let fila = tbody.insertRow();
      let fechaGuardada = new Date(listado_de_aplicaciones[i]["fecha"]);
      let year = fechaGuardada.getFullYear();
      let month = String(fechaGuardada.getMonth() + 1).padStart(2, "0");
      let day = String(fechaGuardada.getDate()).padStart(2, "0");
      let fechaFormateada = `${year}-${month}-${day}`;
      let celda_fecha = fila.insertCell();
      celda_fecha.innerHTML = fechaFormateada;
      let celda_nombre = fila.insertCell();
      celda_nombre.innerHTML = listado_de_aplicaciones[i]["puesto"];
      let celda_apellido1 = fila.insertCell();
      celda_apellido1.innerHTML = listado_de_aplicaciones[i]["empresa"];
      let celda_apellido2 = fila.insertCell();
      celda_apellido2.innerHTML = listado_de_aplicaciones[i]["ubicacion"];
      let celda_tipousuario = fila.insertCell();
      celda_tipousuario.innerHTML = listado_de_aplicaciones[i]["estado"];
      crear_botones(fila, i);
    }
  }
};

const filtrar_datos = async () => {
  tbody.innerHTML = "";
  let filtro = input_filtro.value.toLowerCase();
  let fechaFiltro = input_fecha.value;
  let coincidencias = false;
  for (let i = 0; i < listado_de_aplicaciones.length; i++) {
    if (listado_de_aplicaciones[i]["correo"] === correoUsuario) {
      let puesto = listado_de_aplicaciones[i]["puesto"].toLowerCase();
      let empresa = listado_de_aplicaciones[i]["empresa"].toLowerCase();
      let ubicacion = listado_de_aplicaciones[i]["ubicacion"].toLowerCase();
      let estado = listado_de_aplicaciones[i]["estado"].toLowerCase();
      let fechaGuardada = new Date(listado_de_aplicaciones[i]["fecha"]);
      let year = fechaGuardada.getFullYear();
      let month = String(fechaGuardada.getMonth() + 1).padStart(2, "0");
      let day = String(fechaGuardada.getDate()).padStart(2, "0");
      let fechaFormateada = `${year}-${month}-${day}`;
      
      // Verificar si el filtro de fecha está vacío o coincide con la fecha del registro
      const filtroFecha = fechaFiltro === '' || fechaFormateada === fechaFiltro;
      
      if (
        (puesto.includes(filtro) ||
        empresa.includes(filtro) ||
        ubicacion.includes(filtro) ||
        estado.includes(filtro)) &&
        filtroFecha
      ) {
        let fila = tbody.insertRow();
        let celda_fecha = fila.insertCell();
        let celdaPuesto = fila.insertCell();
        let celdaEmpresa = fila.insertCell();
        let celdaUbicacion = fila.insertCell();
        let celdaEstado = fila.insertCell();
        celda_fecha.innerHTML = fechaFormateada;
        celdaPuesto.innerHTML = listado_de_aplicaciones[i]["puesto"];
        celdaEmpresa.innerHTML = listado_de_aplicaciones[i]["empresa"];
        celdaUbicacion.innerHTML = listado_de_aplicaciones[i]["ubicacion"];
        celdaEstado.innerHTML = listado_de_aplicaciones[i]["estado"];
        crear_botones(fila, i);
        coincidencias = true;
      }
    }
  }
  mostrar_mensaje_no_coincidencias(coincidencias);
};

const mostrar_mensaje_no_coincidencias = (coincidencias) => {
  if (!coincidencias) {
    let fila = tbody.insertRow();
    let celdaMensaje = fila.insertCell();
    celdaMensaje.colSpan = 6;
    celdaMensaje.innerHTML = "No se encontraron registros para esta búsqueda";
  }
};

mostrar_datos_en_tabla();

btnBuscar.addEventListener("click", () => {
  filtrar_datos();
});

input_fecha.addEventListener("change", () => {
  filtrar_datos();
});