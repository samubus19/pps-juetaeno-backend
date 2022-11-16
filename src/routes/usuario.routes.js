const { Router }         = require('express');
const { verificarToken } = require('../middlewares/verificacion-jwt');
const { verificarRol }   = require('../middlewares/verificar-rol');
const { 
    crearNuevoUsuario,
    inciarSesionUsuario,
    actualizarContraseniaUsuario,
    obtenerUsuarios,
    editarUsuario
 } = require('../controllers/usuario.controller');
const router            = Router();

//crear nuevo usuario
router.post('/users', verificarToken, verificarRol ,crearNuevoUsuario);
//iniciar sesion de usuario
router.post('/users/login', inciarSesionUsuario);
//actualizar contraseña de usuario
router.put('/users/passwd/:idUsuario', verificarToken ,actualizarContraseniaUsuario);
//obtener todos los usuarios
router.get('/users', obtenerUsuarios);
//Editar usuario
router.put('/users/:idUsuario', verificarToken, verificarRol ,editarUsuario);


module.exports = router;