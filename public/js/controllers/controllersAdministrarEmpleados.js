const tbody = document.querySelector("#informacionRegistro tbody");

let listado_de_usuarios = [];

function crear_botones(fila, i) {
  //crear un boton de editar para cada registro
  let celda_acciones = fila.insertCell();
  //crear un boton
  let boton_editar = document.createElement("button");
  let boton_eliminar = document.createElement("button");

  boton_editar.classList.add("btnModificar"); // Clase para el botón de editar
  boton_eliminar.classList.add("btnEliminar");

  //afectar el contenido del botón
  boton_editar.innerText = "Modificar";
  boton_eliminar.innerText = "Eliminar";

  //agregamos un evento al botón
  boton_editar.addEventListener("click", () => {
    localStorage.setItem("correo", listado_de_usuarios[i].correo);
    window.location.href = "modificar-datos-reclutador-manager.html";
  });

  boton_eliminar.addEventListener("click", () => {
    localStorage.setItem("id_mongo", listado_de_usuarios[i]._id);
    let id = localStorage.getItem("id_mongo");
    Swal.fire({
      title: "¿Estás seguro?",
      html: "¿De verdad quieres eliminar este registro?<br>Este proceso no se puede deshacer.",
      icon: "error",
      showCancelButton: true,
      confirmButtonColor: "#D82F2F",
      cancelButtonColor: "#6D8B74",
      confirmButtonText: "Cancelar",
      cancelButtonText: "Confirmar",
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.cancel) {
        // Ejecutar la eliminación
        eliminar_persona(id).then(() => {
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
  celda_acciones.appendChild(boton_editar);
}

const mostrar_datos_en_tabla = async () => {
    listado_de_usuarios = await listar_empleados_BD();
    
    tbody.innerHTML = "";
    let empresaID = sessionStorage.getItem("Usuario ID");
  
    const empresa_nombre = async () => {
      let empresa = await obtener_empresa_por_id(empresaID);
      return empresa.nombre; // Devuelve el nombre de la empresa
    };
  
    let nombreEmpresa = await empresa_nombre(); // Espera a que se resuelva la función empresa_nombre()
  
    for (let i = 0; i < listado_de_usuarios.length; i++) {
      if (listado_de_usuarios[i]["empresa_empleado"] === nombreEmpresa) {
        let fila = tbody.insertRow();
  
        let celda_nombre = fila.insertCell();
        celda_nombre.innerHTML = listado_de_usuarios[i]["nombre"];
  
        let celda_apellido1 = fila.insertCell();
        celda_apellido1.innerHTML = listado_de_usuarios[i]["apellido1"];
  
        let celda_apellido2 = fila.insertCell();
        celda_apellido2.innerHTML = listado_de_usuarios[i]["apellido2"];
  
        let celda_correo = fila.insertCell();
        celda_correo.innerHTML = listado_de_usuarios[i]["correo"];
  
        let celda_tipousuario = fila.insertCell();
        celda_tipousuario.innerHTML = listado_de_usuarios[i]["tipoUsuario"];
  
        let celda_estado = fila.insertCell();
        celda_estado.innerHTML = listado_de_usuarios[i]["estado"];
  
        crear_botones(fila, i); //la función crea dos botones uno para eliminar y otro para editar
      }
    }
  };
  
  mostrar_datos_en_tabla();
  