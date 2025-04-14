// subirArchivo.js
document.addEventListener('DOMContentLoaded', () => {
  const widget_cloudinary = cloudinary.createUploadWidget({
    cloudName: "dcljj4gzj",
    uploadPreset: "codemasters_preset"
  }, (error, result) => {
    if (!error && result && result.event === "success") {
      console.log("Archivo registrado", result.info);
      const urlArchivo = result.info.secure_url;
      document.getElementById("urlArchivo").value = urlArchivo;
    }
  });

  document.getElementById("btnSubirArchivo").addEventListener("click", () => {
    widget_cloudinary.open();
  });
});
