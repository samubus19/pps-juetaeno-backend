const { Router }         = require('express');
const { verificarToken } = require('../middlewares/verificacion-jwt');
const { 
    crearNuevoExpediente,
    actualizarEstadoExpediente,
    obtenerExpedientes } = require('../controllers/expediente.controller');
 
const router             = Router();

//Obtener listado de expedientes
router.get('/files', obtenerExpedientes);
//Crear nuevo registro de expediente
router.post('/files', crearNuevoExpediente);
//Actualizar estado de expediente
router.put('/files', actualizarEstadoExpediente);

module.exports = router;