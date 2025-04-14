//http://localhost:3000/api/registroEmpresa
const express = require('express')
const RegistroEmpresa = require('../models/registroEmpresa')
const mailer = require ('../templates/BienvenidaRegistroEmpresas')
const router = express.Router();


router.post('/registroEmpresa',function(req,res){
    let cuerpoPeticion = req.body;
    console.log(cuerpoPeticion);

    let nuevoRegistroEmpresa = new RegistroEmpresa({
        nombre:cuerpoPeticion.nombre,
        correo:cuerpoPeticion.correo,
        contrasenna:cuerpoPeticion.contrasenna,  
        fotoPerfil:cuerpoPeticion.fotoPerfil,
    })


   nuevoRegistroEmpresa.save()
   .then((RegistroEmpresaDB)=>{
    mailer.enviar_mail(RegistroEmpresaDB.nombre, RegistroEmpresaDB.correo);
    res.status(201).json({
        msg:"La empresa se ha registrado",
        resultado:true,
        RegistroEmpresaDB
    })

   })
   .catch((error)=>{
    res.status(501).json({
        resultado:false,
        msg:"No se registro la empresa, ocurrio el siguiente error: ",
        error
        
    })
   })
});


router.get('/buscarEmpresaPorId', function(req, res) {
    let id = req.query.id;

    RegistroEmpresa.findById(id) 
        .then((empresa) => {
            if (empresa) {
                res.status(200).json({
                    resultado: true,
                    empresa
                });
            } else {
                res.status(404).json({
                    resultado: false,
                    msg: "Empresa no encontrado"
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

router.get('/registroEmpresa',function(req,res){

    RegistroEmpresa.find()
    .then((resultado)=>{
        res.status(200).json({
            msg:"Lista de empresas",
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

router.put('/registroDatosEmpresa',function(req,res){

    let cuerpoPeticion = req.body;

    const {_id,nombre,correo,fotoPerfil} = cuerpoPeticion

    RegistroEmpresa.updateOne({_id},{$set:{nombre,correo,fotoPerfil}})
    .then((registroEmpresaActualizado)=>{
        res.status(200).json({
            resultado:true,
            msg:"Información actualizada",
            registroEmpresaActualizado
        })
    })
    .catch((error)=>{
        res.status(501).json({
            resultado:false,
            msg:"No se pudo registrar la empresa, ocurrió el siguiente error: ",
            error
        })
    })

})

router.delete('/registroEmpresa',function(req,res){
    let cuerpoPeticion = req.body;

    RegistroEmpresa.deleteOne({_id:cuerpoPeticion._id})
    .then((result)=>{
        res.status(200).json({
            resultado:true,
            msg:"Empresa eliminada",
            result
        })
    })
    .catch((error)=>{
        res.status(501).json({
            resultado:false,
            msg:"No se pudo eliminar la empresa, ocurrió el siguiente error: ",
            error
        })
    })
})

module.exports = router
