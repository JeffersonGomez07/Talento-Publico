let tipoUsuario = sessionStorage.getItem("Tipo de usuario")
const tbody = document.querySelector("#verAplicaciones tbody");

let listado_de_aplicaciones = [];

function crear_boton_estado(fila, i) {
  let celda_acciones = fila.insertCell();

  let boton_estado = document.createElement("button");

  boton_estado.innerText = listado_de_aplicaciones[i]["estado"];
  const estado = listado_de_aplicaciones[i]["estado"];
  
  if (estado === "Revisión") {
    boton_estado.classList.add("btnEstado");
  } else if (estado === "Aceptada") {
    boton_estado.classList.add("btnEstadoAceptada");
  } else if (estado === "Denegada") {
    boton_estado.classList.add("btnEstadoDenegada");
  }

  boton_estado.addEventListener("click", () => {
    localStorage.setItem("id_aplicacion", listado_de_aplicaciones[i]._id);
    if (tipoUsuario == "Administrador") {
      window.location.href = "modificar-estado-aplicacion-administrador.html";
    } else if (tipoUsuario == "Manager"){
      window.location.href = "modificar-estado-aplicacion-manager.html";
    } else if (tipoUsuario == "Reclutador"){
      window.location.href = "modificar-estado-aplicacion-reclutador.html";
    }
  });

  celda_acciones.appendChild(boton_estado);
}

function crear_boton_estudios(fila, i) {
  let celda_acciones = fila.insertCell();

  let boton_estudio = document.createElement("button");

  boton_estudio.classList.add("btnVerDetalles");

  boton_estudio.innerText = "Ver detalles";

  boton_estudio.addEventListener("click", () => {
    localStorage.setItem("id_aplicacion", listado_de_aplicaciones[i]._id);
    if (tipoUsuario == "Administrador") {
      window.location.href = "descripcion-estudios-aplicacion-administrador.html";
    } else if (tipoUsuario == "Manager"){
      window.location.href = "descripcion-estudios-aplicacion-manager.html";
    } else if (tipoUsuario == "Reclutador"){
      window.location.href = "descripcion-estudios-aplicacion-reclutador.html";
    }
  });

  celda_acciones.appendChild(boton_estudio);
}

function crear_boton_experiencias(fila, i) {
  let celda_acciones = fila.insertCell();

  let boton_experiencia = document.createElement("button");

  boton_experiencia.classList.add("btnVerDetalles");

  boton_experiencia.innerText = "Ver detalles";

  boton_experiencia.addEventListener("click", () => {
    localStorage.setItem("id_aplicacion", listado_de_aplicaciones[i]._id);
    if (tipoUsuario == "Administrador") {
      window.location.href = "descripcion-experiencia-administrador.html";
    } else if (tipoUsuario == "Manager"){
      window.location.href = "descripcion-experiencia-aplicacion-manager.html";
    } else if (tipoUsuario == "Reclutador"){
      window.location.href = "descripcion-experiencia-aplicacion-reclutador.html";
    }
  });

  celda_acciones.appendChild(boton_experiencia);
}

const mostrar_datos_en_tabla = async () => {
  listado_de_aplicaciones = await listar_aplicaciones_BD();
    
    tbody.innerHTML = "";
    let usuarioID = sessionStorage.getItem("Usuario ID");
    let tipoUsuario = sessionStorage.getItem("Tipo de usuario")
    
    if (tipoUsuario === "Administrador") {
      const empresa_nombre = async () => {
        let empresa = await obtener_empresa_por_id(usuarioID);
        return empresa.nombre;
      };

      let nombreEmpresa = await empresa_nombre();

      for (let i = 0; i < listado_de_aplicaciones.length; i++) {
        if (listado_de_aplicaciones[i]["empresa"] === nombreEmpresa) {
          let fila = tbody.insertRow();
    
          let celda_nombre = fila.insertCell();
          celda_nombre.innerHTML = listado_de_aplicaciones[i]["nombre"];
    
          crear_boton_estudios(fila, i)
    
          crear_boton_experiencias(fila, i)
  
          let celda_puesto = fila.insertCell();
          celda_puesto.innerHTML = listado_de_aplicaciones[i]["puesto"];
    
          crear_boton_estado(fila, i);
        }
      }
    } else {
      const empleado_empresa = async () => {
        let empleado = await obtener_empleado_por_id(usuarioID);
        return empleado.empresa_empleado;
      };
      let empleadoEmpresa = await empleado_empresa();

      for (let i = 0; i < listado_de_aplicaciones.length; i++) {
        if (listado_de_aplicaciones[i]["empresa"] === empleadoEmpresa) {
          let fila = tbody.insertRow();
    
          let celda_nombre = fila.insertCell();
          celda_nombre.innerHTML = listado_de_aplicaciones[i]["nombre"];
    
          crear_boton_estudios(fila, i)
    
          crear_boton_experiencias(fila, i)
  
          let celda_puesto = fila.insertCell();
          celda_puesto.innerHTML = listado_de_aplicaciones[i]["puesto"];
    
          crear_boton_estado(fila, i);
        }
      }
    }
    

    
  
    
  
    
  };
  
  mostrar_datos_en_tabla();
  