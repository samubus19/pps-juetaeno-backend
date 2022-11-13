const { Router }         = require('express');
const { verificarToken } = require('../middlewares/verificacion-jwt');
const { verificarRol }   = require('../middlewares/verificar-rol');
const { 
    crearNuevoUsuario,
    inciarSesionUsuario,
    actualizarContraseniaUsuario,
    obtenerUsuarios
 } = require('../controllers/usuario.controller')
const router            = Router();

//crear nuevo usuario
router.post('/users', verificarToken, verificarRol ,crearNuevoUsuario);
//iniciar sesion de usuario
router.post('/users/login', inciarSesionUsuario);
//actualizar contraseña de usuario
router.put('/users/:id_usuario', verificarToken ,actualizarContraseniaUsuario);
//obtener todos los usuarios
router.get('/users', obtenerUsuarios);


module.exports = router;