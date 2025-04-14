const boton_imagen = document.querySelector("#btnFotoUsuario");
const imagen = document.querySelector("#fotoUsuario");


let widget_cloudinary = cloudinary.createUploadWidget({
    cloudName: "dcljj4gzj",
    uploadPreset: "codemasters_preset"
}, (error, result) => {
    if (!error && result && result.event === "success") {
        console.log("Imagen registrada", result.info);
        imagen.src = result.info.secure_url;
    }
});

boton_imagen.addEventListener("click", () => {
    widget_cloudinary.open();
}, false);