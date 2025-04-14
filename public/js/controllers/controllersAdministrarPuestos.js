const tbody = document.querySelector("#informacion-puesto tbody");

let lista_puestos = [];

function crear_botones(fila, i) {
  //crear un boton de editar para cada registro
  let celda_acciones = fila.insertCell();
  //crear un boton
  let boton_editar = document.createElement("button");
  let boton_eliminar = document.createElement("button");

  boton_editar.classList.add("btnModificar"); // Clase para el botón de editar
  boton_eliminar.classList.add("btnEliminar");

  boton_editar.innerText = "Modificar";
  boton_eliminar.innerText = "Eliminar";

  boton_editar.addEventListener("click", () => {
    localStorage.setItem("id_puesto", lista_puestos[i]._id);
    window.location.href = "modificar-puesto.html";
  });

  boton_eliminar.addEventListener("click", () => {
    localStorage.setItem("id_mongo", lista_puestos[i]._id);
    let id = localStorage.getItem("id_mongo");
    Swal.fire({
      title: "¿Estás seguro?",
      html: "¿De verdad quieres eliminar este puesto?<br>Este proceso no se puede deshacer.",
      icon: "error",
      showCancelButton: true,
      confirmButtonColor: "#D82F2F",
      cancelButtonColor: "#6D8B74",
      confirmButtonText: "Cancelar",
      cancelButtonText: "Confirmar",
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.cancel) {
        eliminar_puesto(id).then(() => {
          Swal.fire("Eliminado!", "El puesto se ha sido eliminado.", "success");
          setTimeout(() => {
            window.location.href = "administrar-puestos.html"; // Redirige después de 3 segundos
          }, 3000);
        });
      } else {
        // El usuario canceló, no hacemos nada
      }
    });
  });

  celda_acciones.appendChild(boton_eliminar);
  celda_acciones.appendChild(boton_editar);
}

const mostrar_datos_en_tabla = async () => {
  lista_puestos = await listar_puestos_BD();

  tbody.innerHTML = "";
  let empresaID = sessionStorage.getItem("Usuario ID");

  const nombre_empresa = async () => {
    let empleado = await obtener_empleado_por_id(empresaID);
    return empleado.empresa_empleado;
  };

  let nombreEmpresa = await nombre_empresa();
  //   console.log("Nombre Empresa:", nombreEmpresa);

  for (let i = 0; i < lista_puestos.length; i++) {
    if (lista_puestos[i]["empresa_puesto"] === nombreEmpresa) {
      let fila = tbody.insertRow(); // Crear una nueva fila

      let celda_puesto = fila.insertCell();
      celda_puesto.innerHTML = lista_puestos[i]["puesto"];

      let celda_vista = fila.insertCell();
      celda_vista.innerHTML = lista_puestos[i]["visibilidad"];

      crear_botones(fila, i);
    }
  }
};

// Llamar a la función
mostrar_datos_en_tabla();
