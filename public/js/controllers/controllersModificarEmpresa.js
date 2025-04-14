const idUsuario = sessionStorage.getItem('Usuario ID');
    
// Función para llenar los elementos con los datos del usuario
const llenarDatosUsuario = async () => {
    const empresa = await obtener_empresa_por_id(idUsuario); // Utiliza la función que definiste antes

    if (empresa) {
        const nombreElement = document.getElementById('nombre');
        const correoElement = document.getElementById('correo');
        const imgPerfil = document.getElementById('imgPerfildeusuario'); // Selecciona el elemento de imagen


        nombreElement.textContent = empresa.nombre;
        correoElement.textContent = empresa.correo;
        
        if (empresa.fotoPerfil === "" || empresa.fotoPerfil === "http://127.0.0.1:5502/public/img/ImgFondoBlanco.png") {
            imgPerfil.src = './img/imgIconoUsuarioFinal.png';
        } else {
            imgPerfil.src = empresa.fotoPerfil;
        }

    }
};

window.onload = llenarDatosUsuario;

