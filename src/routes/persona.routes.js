const { Router }         = require('express');
const { verificarToken } = require('../middlewares/verificacion-jwt');
const { 
    crearNuevaPersona,
    obtenerPersonaPorNroDocumento
} = require('../controllers/persona.controller');
 
const router             = Router();

//Crear nueva persona
router.post('/person', crearNuevaPersona);
//Obtener persona por nro de documento
router.get('/person/:nro', obtenerPersonaPorNroDocumento);

module.exports = router;