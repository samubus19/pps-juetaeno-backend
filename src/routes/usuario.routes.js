const { Router }         = require('express');
const { verificarToken } = require('../middlewares/verificacion-jwt');
const { verificarRol }   = require('../middlewares/verificar-rol');
const { 
    crearNuevoUsuario,
    inciarSesionUsuario,
    actualizarContraseniaUsuario,
    obtenerUsuarios,
    editarUsuario,
    obtenerUsuarioPorId
 } = require('../controllers/usuario.controller');
const router            = Router();

//crear nuevo usuario
router.post('/users', verificarToken, verificarRol ,crearNuevoUsuario);
//iniciar sesion de usuario
router.post('/users/login', inciarSesionUsuario);
//actualizar contraseña de usuario
router.put('/users/passwd/:idUsuario', verificarToken ,actualizarContraseniaUsuario);
//obtener todos los usuarios
router.get('/users/all', verificarToken, obtenerUsuarios);
//Editar usuario
router.put('/users/:idUsuario', verificarToken, verificarRol ,editarUsuario);
//obtener usuario por id
router.get('/users/:idUsuario', verificarToken, obtenerUsuarioPorId);

module.exports = router;