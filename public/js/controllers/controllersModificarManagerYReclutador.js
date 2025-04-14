const idUsuario = sessionStorage.getItem("Usuario ID");

// Función para llenar los elementos con los datos del usuario
const llenarDatosUsuario = async () => {
  const empleado = await obtener_empleado_por_id(idUsuario); // Utiliza la función que definiste antes

  if (empleado) {
    const nombre = document.getElementById("nombre");
    const correo = document.getElementById("correo");
    const apellido1 = document.getElementById("apellido1");
    const apellido2 = document.getElementById("apellido2");

    nombre.textContent = empleado.nombre;
    correo.textContent = empleado.correo;
    apellido1.textContent = empleado.apellido1;
    apellido2.textContent = empleado.apellido2;
  }
};

window.onload = llenarDatosUsuario;
