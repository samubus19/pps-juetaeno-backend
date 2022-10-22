const { Router }         = require('express');
const { verificarToken } = require('../middlewares/verificacion-jwt');
const { verificarRol }   = require('../middlewares/verificar-rol');
const { 
    crearNuevaPersona,
    obtenerPersonaPorNroDocumento
} = require('../controllers/persona.controller');
 
const router             = Router();

//Crear nueva persona
router.post('/person', verificarToken,crearNuevaPersona);
//Obtener persona por nro de documento
router.get('/person/:nro', verificarToken,obtenerPersonaPorNroDocumento);

module.exports = router;