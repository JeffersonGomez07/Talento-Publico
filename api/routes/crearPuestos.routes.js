//http://localhost:3000/api/persona
const express = require('express')
const CrearPuesto = require('../models/crearPuesto')
const router = express.Router();


router.post('/crearPuesto',function(req,res){
    let cuerpoPeticion = req.body;
    console.log(cuerpoPeticion);

    let nuevoCrearPuesto = new CrearPuesto({
        puesto:cuerpoPeticion.puesto,
        horario:cuerpoPeticion.horario,  
        salario:cuerpoPeticion.salario,
        responsabilidad:cuerpoPeticion.responsabilidad,  
        provincia:cuerpoPeticion.provincia,
        canton:cuerpoPeticion.canton,
        visibilidad:cuerpoPeticion.visibilidad,
        aptitudes:cuerpoPeticion.aptitudes,
        habilidades:cuerpoPeticion.habilidades,
        detalles:cuerpoPeticion.detalles,
        beneficios:cuerpoPeticion.beneficios,
        responsabilidades:cuerpoPeticion.responsabilidades,
        empresa_puesto:cuerpoPeticion.empresa_puesto,
    })


   nuevoCrearPuesto.save()
   .then((CrearPuestoDB)=>{
    res.status(201).json({
        msg:"El puesto se ha creado",
        resultado:true,
        CrearPuestoDB
    })

   })
   .catch((error)=>{
    res.status(501).json({
        resultado:false,
        msg:"No se creo el puesto, ocurrio el siguiente error: ",
        error
        
    })
   })
});


router.get('/crearPuesto',function(req,res){

    CrearPuesto.find()
    .then((resultado)=>{
        res.status(200).json({
            msg:"Lista de puestos",
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

router.get('/buscarPuestoPorId', function(req, res) {
    let id = req.query.id;

    CrearPuesto.findById(id) 
        .then((puesto) => {
            if (puesto) {
                res.status(200).json({
                    resultado: true,
                    puesto
                });
            } else {
                res.status(404).json({
                    resultado: false,
                    msg: "Puesto no encontrado"
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


router.put('/crearPuesto',function(req,res){

    let cuerpoPeticion = req.body;

    const {_id,puesto,horario,salario,responsabilidad,provincia,canton,visibilidad,aptitudes,habilidades,detalles,beneficios,responsabilidades} = cuerpoPeticion

    CrearPuesto.updateOne({_id},{$set:{puesto,horario,salario,responsabilidad,provincia,canton,visibilidad,aptitudes,habilidades,detalles,beneficios,responsabilidades}})
    .then((crearPuestoActualizado)=>{
        res.status(200).json({
            resultado:true,
            msg:"Información actualizada",
            crearPuestoActualizado
        })
    })
    .catch((error)=>{
        res.status(501).json({
            resultado:false,
            msg:"No se pudo actualizar el puesto, ocurrió el siguiente error: ",
            error
        })
    })

})

router.delete('/crearPuesto',function(req,res){
    let cuerpoPeticion = req.body;

    CrearPuesto.deleteOne({_id:cuerpoPeticion._id})
    .then((result)=>{
        res.status(200).json({
            resultado:true,
            msg:"Puesto eliminado",
            result
        })
    })
    .catch((error)=>{
        res.status(501).json({
            resultado:false,
            msg:"No se pudo eliminar el puesto, ocurrió el siguiente error: ",
            error
        })
    })
})

module.exports = router