//necesitamos importar express
const express = require('express')
const Usuario = require('../models/registroUsuario')
const mailer = require ('../templates/BienvenidaRegistroUsuario')
const router = express.Router();

//http://localhost:3000/api/usuario
//POST
router.post('/registrarUsuario', function (req, res) {
    let cuerpoPeticion = req.body;

    console.log(cuerpoPeticion);

    let nuevoUsuario = new Usuario({
        nombre: cuerpoPeticion.nombre,
        apellido1: cuerpoPeticion.apellido1,
        genero: cuerpoPeticion.genero,
        apellido2: cuerpoPeticion.apellido2,
        correo: cuerpoPeticion.correo,
        contrasenna: cuerpoPeticion.contrasenna,
        fotoPerfil: cuerpoPeticion.fotoPerfil,
        curriculum: cuerpoPeticion.curriculum,
        estudios: cuerpoPeticion.estudios,
        experiencias: cuerpoPeticion.experiencias,
    });

    // Guardar en la BD
    nuevoUsuario.save()
        .then((UsuarioDB) => {
            mailer.enviar_mail(UsuarioDB.nombre, UsuarioDB.correo);
            res.status(201).json({
                msg: "Usuario registrado",
                resultado: true,
                UsuarioDB
            });
        })
        .catch((error) => {
            res.status(501).json({
                resultado: false,
                msg: "No se registró la persona, ocurrió el siguiente error:",
                error
            });
        });
});


//listar lo que hay en la BD
//GET
//http://localhost:3000/api/persona
router.get('/VerUsuarios',function(req,res){
    //let Usuario = req.body;

    Usuario.find()
    .then((resultado)=>{
        res.status(200).json({
            msg:"Lista de usuarios",
            resultado:true,
            resultado
        })
    })
    .catch((error)=>{
        res.status(501).json({
            resultado:false,
            msg:"No se logró recuperar de la BD, ocurrio el siguiente error: ",
            error
        })
    })
}
)

router.get('/buscarUsuarioPorId', function(req, res) {
    let id = req.query.id;

    Usuario.findById(id) 
        .then((usuario) => {
            if (usuario) {
                res.status(200).json({
                    resultado: true,
                    usuario
                });
            } else {
                res.status(404).json({
                    resultado: false,
                    msg: "Usuario no encontrado"
                });
            }
        })
        .catch((error) => {
            res.status(500).json({
                resultado: false,
                msg: "No se pudo recuperar de la BD, ocurrió el siguiente error: ",
                error
            });
        });
});

router.put('/registroDatosUsuario',function(req,res){

    let cuerpoPeticion = req.body;

    const {_id,nombre,apellido1,genero,apellido2,correo,fotoPerfil,estudios,experiencias} = cuerpoPeticion

    Usuario.updateOne({_id},{$set:{nombre,apellido1,genero,apellido2,correo,fotoPerfil,estudios,experiencias}})
    .then((registroUsuarioActualizado)=>{
        res.status(200).json({
            resultado:true,
            msg:"Información actualizada",
            registroUsuarioActualizado
        })
    })
    .catch((error)=>{
        res.status(501).json({
            resultado:false,
            msg:"No se pudo registrar el usuario, ocurrió el siguiente error: ",
            error
        })
    })

})

const Aplicar = require('../models/aplicar')

router.post('/aplicar',function(req,res){
    let cuerpoPeticion = req.body;
    console.log(cuerpoPeticion);

    let nuevoCrearPuesto = new Aplicar({
        puesto:cuerpoPeticion.puesto,
        empresa:cuerpoPeticion.empresa,
        ubicacion:cuerpoPeticion.ubicacion,
        nombre:cuerpoPeticion.nombre,
        apellido1:cuerpoPeticion.apellido1,  
        apellido2:cuerpoPeticion.apellido2,
        correo:cuerpoPeticion.correo,  
        estudios:cuerpoPeticion.estudios,
        experiencias:cuerpoPeticion.experiencias,
        estado:cuerpoPeticion.estado
    })


   nuevoCrearPuesto.save()
   .then((AplicarDB)=>{
    res.status(201).json({
        msg:"La aplicacion se ha creado",
        resultado:true,
        AplicarDB
    })

   })
   .catch((error)=>{
    res.status(501).json({
        resultado:false,
        msg:"No se creo la aplicacion, ocurrio el siguiente error: ",
        error
        
    })
   })
});

router.get('/listaAplicaciones',function(req,res){
    //let Usuario = req.body;

    Aplicar.find()
    .then((resultado)=>{
        res.status(200).json({
            msg:"Lista de usuarios",
            resultado:true,
            resultado
        })
    })
    .catch((error)=>{
        res.status(501).json({
            resultado:false,
            msg:"No se logró recuperar de la BD, ocurrio el siguiente error: ",
            error
        })
    })
}
)

router.get('/buscarAplicacionPorId', function(req, res) {
    let id = req.query.id;

    Aplicar.findById(id) 
        .then((aplicacion) => {
            if (aplicacion) {
                res.status(200).json({
                    resultado: true,
                    aplicacion
                });
            } else {
                res.status(404).json({
                    resultado: false,
                    msg: "Usuario no encontrado"
                });
            }
        })
        .catch((error) => {
            res.status(500).json({
                resultado: false,
                msg: "No se pudo recuperar de la BD, ocurrió el siguiente error: ",
                error
            });
        });
});


router.put('/modificarEstadoAplicacion',function(req,res){

    let cuerpoPeticion = req.body;

    const {_id,estado} = cuerpoPeticion

    Aplicar.updateOne({_id},{$set:{estado}})
    .then((registroUsuarioActualizado)=>{
        res.status(200).json({
            resultado:true,
            msg:"Información actualizada",
            registroUsuarioActualizado
        })
    })
    .catch((error)=>{
        res.status(501).json({
            resultado:false,
            msg:"No se pudo registrar el usuario, ocurrió el siguiente error: ",
            error
        })
    })

})

router.delete('/eliminarAplicacion',function(req,res){
    let cuerpoPeticion = req.body;

    Aplicar.deleteOne({_id:cuerpoPeticion._id})
    .then((result)=>{
        res.status(200).json({
            resultado:true,
            msg:"Empleado eliminada",
            result
        })
    })
    .catch((error)=>{
        res.status(501).json({
            resultado:false,
            msg:"No se pudo eliminar el empleado, ocurrió el siguiente error: ",
            error
        })
    })
})
module.exports = router
