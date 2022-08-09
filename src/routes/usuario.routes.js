const { Router }        = require('express');
const { 
    crearNuevoUsuario,
    inciarSesionUsuario,
    actualizarContraseniaUsuario
 } = require('../controllers/usuario.controller')

 const { verificarToken } = require('../middlewares/verificacion-jwt');
 
const router            = Router();

//crear nuevo usuario
router.post('/users', crearNuevoUsuario);
//iniciar sesion de usuario
router.post('/users/login', inciarSesionUsuario);
//actualizar contraseña de usuario
router.put('/users', actualizarContraseniaUsuario);


module.exports = router;