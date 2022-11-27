const { Router }         = require('express');
const { verificarToken } = require('../middlewares/verificacion-jwt');
const { verificarRol }   = require('../middlewares/verificar-rol');
const { 
    crearNuevaPersona,
    obtenerPersonaPorNroDocumento,
    editarPersona,
    eliminarPersona
} = require('../controllers/persona.controller');
 
const router             = Router();

//Crear nueva persona
router.post('/person',              verificarToken, verificarRol, crearNuevaPersona);
//Obtener persona por nro de documento
router.get('/person/:nro',          verificarToken, obtenerPersonaPorNroDocumento);
//Editar persona
router.put('/person/:idPersona',    verificarToken, verificarRol, editarPersona);
//Elimnar persona
router.delete('/person/:idPersona', verificarToken, verificarRol, eliminarPersona);

module.exports = router;