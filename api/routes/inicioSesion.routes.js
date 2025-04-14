const express = require("express");
const Empresa = require("../models/registroEmpresa");
const Empleados = require("../models/invitarEmpleado");
const Usuarios = require("../models/registroUsuario");  // Agregamos el modelo de Usuarios
const router = express.Router();

router.post("/validarCredenciales", (req, res) => {
    Empresa.findOne({ correo: req.body.correo })
        .then(function(usuario) {
            if (usuario) {
                if (usuario.contrasenna === req.body.contrasenna) {
                    res.json({
                        resultado: true,
                        usuario: usuario
                    });
                } else {
                    res.json({
                        resultado: false,
                        msg: "Contraseña incorrecta"
                    });
                }
            } else {
                Empleados.findOne({ correo: req.body.correo })
                    .then(function(empleados) {
                        if (empleados) {
                            if (empleados.contrasenna === req.body.contrasenna) {
                                res.json({
                                    resultado: true,
                                    usuario: empleados
                                });
                            } else {
                                res.json({
                                    resultado: false,
                                    msg: "Contraseña incorrecta"
                                });
                            }
                        } else {
                            Usuarios.findOne({ correo: req.body.correo })
                                .then(function(usuarios) {
                                    if (usuarios) {
                                        if (usuarios.contrasenna === req.body.contrasenna) {
                                            res.json({
                                                resultado: true,
                                                usuario: usuarios
                                            });
                                        } else {
                                            res.json({
                                                resultado: false,
                                                msg: "Contraseña incorrecta"
                                            });
                                        }
                                    } else {
                                        res.json({
                                            resultado: false,
                                            msg: "El usuario no existe"
                                        });
                                    }
                                })
                                .catch(function(error) {
                                    console.error(error);
                                    res.json({
                                        resultado: false,
                                        msg: "Error en la validación de credenciales"
                                    });
                                });
                        }
                    })
                    .catch(function(error) {
                        console.error(error);
                        res.json({
                            resultado: false,
                            msg: "Error en la validación de credenciales"
                        });
                    });
            }
        })
        .catch(function(error) {
            console.error(error);
            res.json({
                resultado: false,
                msg: "Error en la validación de credenciales"
            });
        });
});

module.exports = router;