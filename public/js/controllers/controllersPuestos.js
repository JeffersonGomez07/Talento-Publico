const inputFiltro = document.getElementById("buscadorInput");
const btnBuscar = document.getElementById("btnBuscar");

// Agrega un evento de escucha al botón de búsqueda
btnBuscar.addEventListener("click", () => {
  // Llama a la función listar_puestos_BD para obtener la lista de puestos
  listar_puestos_BD().then((puestos) => {
    // Filtra la lista de puestos según el valor del filtro
    const filtro = inputFiltro.value.toLowerCase();
    const puestosFiltrados = puestos.filter((puesto) =>
      puesto.puesto.toLowerCase().includes(filtro)
    );

    // Genera el contenido de la lista de puestos con el filtro aplicado
    generarContenidoPuestos(puestosFiltrados);
  });
});

// Función para obtener los puestos desde tu API utilizando Axios
const listar_puestos_BD = async () => {
  try {
    const response = await axios.get("http://localhost:3000/api/crearPuesto");
    return response.data.resultado;
  } catch (error) {
    console.error("Error puestos:", error);
    return [];
  }
};

function crear_boton_aplicar(puesto) {
  let boton_aplicar = document.createElement("button"); // Nuevo botón "Aplicar"

  boton_aplicar.classList.add("btnAplicar"); // Clase para el botón "Aplicar"

  boton_aplicar.innerText = "Aplicar al puesto"; // Texto para el botón "Aplicar"

  boton_aplicar.addEventListener("click", () => {
    localStorage.setItem("id_puesto", puesto._id);
    window.location.href = "descripcion-aplicacion.html";
  });

  return boton_aplicar;
}

// Función para generar la lista de puestos a la izquierda
function generarContenidoPuestos(puestos) {
  const divContenidoCentrado = document.getElementById("divContenidoCentrado");

  // Limpia el contenido actual antes de agregar los nuevos puestos
  divContenidoCentrado.innerHTML = "";

  const ul = document.createElement("ul");
  ul.classList.add("dynamic-list");

  for (let i = 0; i < puestos.length; i++) {
    const li = document.createElement("li");
    li.textContent = puestos[i].puesto; // Ajusta la propiedad según la estructura de tus datos
    li.addEventListener("click", () => mostrarInfoPuesto(puestos[i])); // Agrega un manejador de clic para mostrar la información
    ul.appendChild(li);
  }

  divContenidoCentrado.appendChild(ul);
}

// Función para mostrar la información detallada del puesto a la derecha
function mostrarInfoPuesto(puesto) {
  const divContenidoCentradoDerech = document.getElementById(
    "divContenidoCentradoDerech"
  );
  divContenidoCentradoDerech.innerHTML = `
          <h1 id="h1TitlePuesto">${puesto.puesto}</h1>
          <h2 id="h2TitleUbicacionPuesto">${puesto.empresa_puesto}&nbsp;&nbsp;-&nbsp;&nbsp;${puesto.provincia}&nbsp;&nbsp;</h2>
          <ul> 
                 <li><span>Puesto:</span>&nbsp;${puesto.puesto}</li> 
                 <li><span>Horario:</span>&nbsp;${puesto.horario}</li> 
                 <li><span>Rango Salarial:</span>&nbsp;${puesto.salario}</li> 
                 <li><span>Nivel de responsabilidad:</span>&nbsp;${puesto.responsabilidad}</li> 
                 <li><span>Aptitudes:</span>&nbsp;${puesto.aptitudes}</li> 
                 <li><span>Requisitos de habilidades:</span>&nbsp;${puesto.habilidades}</li> 
                 <li><span>Ubicación:</span>&nbsp;${puesto.provincia}&nbsp;&nbsp;-&nbsp;&nbsp;${puesto.canton}</li>
                 <li><span>Acerca del empleo:</span>&nbsp;${puesto.detalles}</li>
                 <li><span>Beneficios:</span>&nbsp;${puesto.beneficios}</li>
                 <li><span>Responsabilidades:</span>&nbsp;${puesto.responsabilidades}</li>
             </ul>
      `;
  const divBotonAplicar = document.createElement("div");
  divBotonAplicar.classList.add("divBotonAplicar"); // Agrega clases o estilos si es necesario

  const botonAplicar = crear_boton_aplicar(puesto); // Crea el botón "Aplicar"
  divBotonAplicar.appendChild(botonAplicar);

  divContenidoCentradoDerech.appendChild(divBotonAplicar);
}

// Llama a la función listar_puestos_BD y luego genera el contenido HTML
listar_puestos_BD().then((puestos) => {
  generarContenidoPuestos(puestos);
});
