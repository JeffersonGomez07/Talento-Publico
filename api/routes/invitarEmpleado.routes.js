//http://localhost:3000/api/invitar-empleado
const express = require('express')
const invitarEmpleado = require('../models/invitarEmpleado');
const mailer = require ('../templates/correoInvitarEmpleado')
const router = express.Router();


router.post('/invitarEmpleado',function(req,res){
    let cuerpoPeticion = req.body;
    console.log(cuerpoPeticion);

    let nuevoInvitarEmpleado = new invitarEmpleado({
        nombre:cuerpoPeticion.nombre,
        apellido1:cuerpoPeticion.apellido1,
        apellido2:cuerpoPeticion.apellido2,
        contrasenna:cuerpoPeticion.contrasenna,  
        tipoUsuario:cuerpoPeticion.tipoUsuario,
        correo:cuerpoPeticion.correo,
        empresa_empleado:cuerpoPeticion.empresa_empleado
    })


    nuevoInvitarEmpleado.save()
   .then((RegistroEmpleadoDB)=>{
    mailer.enviar_mail(RegistroEmpleadoDB.nombre, RegistroEmpleadoDB.contrasenna, RegistroEmpleadoDB.tipoUsuario, RegistroEmpleadoDB.correo, RegistroEmpleadoDB.empresa_empleado);
    res.status(201).json({
        msg:"El empleado se ha invitado",
        resultado:true,
        RegistroEmpleadoDB
    })

   })
   .catch((error)=>{
    res.status(501).json({
        resultado:false,
        msg:"No se invito el empleado, ocurrio el siguiente error: ",
        error
        
    })
   })
});


router.get('/invitarEmpleado',function(req,res){

    invitarEmpleado.find()
    .then((resultado)=>{
        res.status(200).json({
            msg:"Lista de empleados",
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


router.put('/invitarEmpleado',function(req,res){

    let cuerpoPeticion = req.body;

    const {_id,nombre,apellido1,apellido2,tipoUsuario, correo, estado} = cuerpoPeticion

    invitarEmpleado.updateOne({_id},{$set:{nombre,apellido1,apellido2,tipoUsuario, correo, estado}})
    .then((invitarEmpleadoActualizado)=>{
        res.status(200).json({
            resultado:true,
            msg:"Información actualizada",
            invitarEmpleadoActualizado
        })
    })
    .catch((error)=>{
        res.status(501).json({
            resultado:false,
            msg:"No se pudo actualizar el empleado, ocurrió el siguiente error: ",
            error
        })
    })

})

router.put('/modificarEmpleado',function(req,res){

    let cuerpoPeticion = req.body;

    const {_id,nombre,apellido1,apellido2, correo} = cuerpoPeticion

    invitarEmpleado.updateOne({_id},{$set:{nombre,apellido1,apellido2, correo}})
    .then((invitarEmpleadoActualizado)=>{
        res.status(200).json({
            resultado:true,
            msg:"Información actualizada",
            invitarEmpleadoActualizado
        })
    })
    .catch((error)=>{
        res.status(501).json({
            resultado:false,
            msg:"No se pudo actualizar el empleado, ocurrió el siguiente error: ",
            error
        })
    })

})

router.delete('/invitarEmpleado',function(req,res){
    let cuerpoPeticion = req.body;

    invitarEmpleado.deleteOne({_id:cuerpoPeticion._id})
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

router.get('/buscarEmpleadoPorId', function(req, res) {
    let id = req.query.id;

    invitarEmpleado.findById(id) 
        .then((empleado) => {
            if (empleado) {
                res.status(200).json({
                    resultado: true,
                    empleado
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

router.get("/buscarPersonaCorreo", (req, res) => {
    let correo = req.query.correo;
    
    invitarEmpleado.find({ correo: correo })
        .then(empleadoDB => {
            if (empleadoDB.length === 0) {
                res.status(200).json({
                    resultado: true,
                    msj: "Persona no está registrada"
                });
            } else {
                res.status(200).json({
                    resultado: true,
                    msj: "Persona encontrada",
                    empleado: empleadoDB
                });
            }
        })
        .catch(error => {
            res.status(500).json({
                resultado: false,
                msj: "Ocurrió el siguiente error",
                error
            });
        });
});

module.exports = router
