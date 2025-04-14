let tipoUsuario = sessionStorage.getItem("Tipo de usuario");
const tbody = document.querySelector('#informacion_usuarios');
const btnEnviar = document.getElementsByClassName("btnEnviar");
let puesto_ID = localStorage.getItem('id_puestoSelected');
const inputFiltro = document.getElementById("buscadorInput");


lista_usuarios = [];

function mostrar_alerta_exitosa(mensaje) {
    Swal.fire({
        icon: "success",
        title: "¡Invitación exitosa!",
        text: mensaje,
        showConfirmButton: true,
        timer: 2000
    });
}

function crear_boton_invitar(fila, i) {    
    let celda_invitar = fila.insertCell();
    
    let boton_invitar = document.createElement("button");

    boton_invitar.classList.add('btnEnviar');
    
    boton_invitar.innerText = "Invitar";
        
    boton_invitar.addEventListener("click", async () => {
      localStorage.setItem("id_usuario", lista_usuarios[i]._id);
      mostrar_alerta_exitosa("Invitación enviada correctamente");
      try {
        const puesto = await obtener_puesto_por_id(puesto_ID);
        const usuario = await obtener_usuario_por_id (lista_usuarios[i]._id)
        const correoUsuario = usuario.correo;
        const nombrePuesto = puesto.puesto;
        const ubicacion = puesto.provincia;

        invitarPuesto(correoUsuario, nombrePuesto, ubicacion)
      } catch (error) {
        console.error("Error al obtener el puesto:", error);
      }
    });

    celda_invitar.appendChild(boton_invitar);
}

function crear_boton_estudios(fila, i) {
    let celda_acciones = fila.insertCell();
  
    let boton_estudio = document.createElement("button");
  
    boton_estudio.classList.add("btnVerDetalles");
  
    boton_estudio.innerText = "Ver detalles";
  
    boton_estudio.addEventListener("click", () => {
      localStorage.setItem("id_usuario", lista_usuarios[i]._id);
      window.location.href = "descripcion-estudios-aplicacion-reclutador-filtrar-usuarios.html";   
    });
  
    celda_acciones.appendChild(boton_estudio);
}
  
function crear_boton_experiencias(fila, i) {
    let celda_acciones = fila.insertCell();
  
    let boton_experiencia = document.createElement("button");
  
    boton_experiencia.classList.add("btnVerDetalles");
  
    boton_experiencia.innerText = "Ver detalles";
  
    boton_experiencia.addEventListener("click", () => {
      localStorage.setItem("id_usuario", lista_usuarios[i]._id);
      window.location.href = "descripcion-experiencia-reclutador-filtrar-usuarios.html";   
})
    celda_acciones.appendChild(boton_experiencia);
};

btnBuscar.addEventListener("click", () => {

   // Llama a la función listar_puestos_BD para obtener la lista de puestos
  listar_usuarios_BD().then((usuarios) => {
    // Filtra la lista de puestos según el valor del filtro
    const filtro = inputFiltro.value.toLowerCase();
    console.log(usuarios)
    console.log(inputFiltro.value)    
    const usuariosFiltrados = usuarios.filter((usuario) =>
    usuario.nombre.toLowerCase().includes(filtro) ||
    usuario.apellido1.toLowerCase().includes(filtro) ||
    usuario.correo.toLowerCase().includes(filtro)
);



    // Genera el contenido de la lista de puestos con el filtro aplicado
    generarContenidoUsuarios(usuariosFiltrados);
    console.log(usuariosFiltrados)
    
  });
});


function generarContenidoUsuarios(usuarios) {
  const divContenidoCentrado = document.getElementById("informacion_usuarios");

  // Limpia el contenido actual antes de agregar los nuevos puestos
  tbody.innerHTML = '';
    document.getElementById("informacion_usuarios").innerHTML =
    "<tr>" +
    "<th>Nombre</th>" +
    "<th>Apellidos</th>" +
    "<th>Correo</th>" +
    "<th>Estudios</th>" +
    "<th>Experiencia</th>" +
    "<th>Invitar</th>" +
    "</tr>";
    for (let i = 0; i < usuarios.length; i++) {
        let fila = tbody.insertRow();
    
        let celda_nombre = fila.insertCell();
        celda_nombre.innerHTML = lista_usuarios[i]["nombre"];
    
        let celda_apellidos = fila.insertCell();
        celda_apellidos.innerHTML = lista_usuarios[i]["apellido1"];

        let celda_correo = fila.insertCell();
        celda_correo.innerHTML = lista_usuarios[i]["correo"];



        crear_boton_estudios(fila, i);
        crear_boton_experiencias(fila, i);
        crear_boton_invitar(fila, i);
        
      }
}


mostrar_datos_tabla = async () => {
    lista_usuarios = await listar_usuarios_BD();

    tbody.innerHTML = '';
    document.getElementById("informacion_usuarios").innerHTML =
    "<tr>" +
    "<th>Nombre</th>" +
    "<th>Apellidos</th>" +
    "<th>Correo</th>" +
    "<th>Estudios</th>" +
    "<th>Experiencia</th>" +
    "<th>Invitar</th>" +
    "</tr>";
    for (let i = 0; i < lista_usuarios.length; i++) {
        let fila = tbody.insertRow();
    
        let celda_nombre = fila.insertCell();
        celda_nombre.innerHTML = lista_usuarios[i]["nombre"];
    
        let celda_apellidos = fila.insertCell();
        celda_apellidos.innerHTML = lista_usuarios[i]["apellido1"];

        let celda_correo = fila.insertCell();
        celda_correo.innerHTML = lista_usuarios[i]["correo"];



        crear_boton_estudios(fila, i);
        crear_boton_experiencias(fila, i);
        crear_boton_invitar(fila, i);
        
      }
}

listar_usuarios_BD().then((usuarios) => {
  mostrar_datos_tabla(usuarios);
});

mostrar_datos_tabla();
