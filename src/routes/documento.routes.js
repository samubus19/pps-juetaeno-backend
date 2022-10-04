const { Router }               = require('express');
const { verificarToken }       = require('../middlewares/verificacion-jwt');
const { 
    crearNuevoDocumento,
    actualizarEstadoDocumento,
    editarDocumento,
    obtenerDocumentos,
    obtenerDocumentoPorNumero} = require('../controllers/documento.controller');
 
const router                   = Router();

//Obtener listado de expedientes
router.get('/files', obtenerDocumentos);
//Crear nuevo registro de expediente
router.post('/files', crearNuevoDocumento);
//Actualizar estado de expediente
router.put('/files/state/:nro', actualizarEstadoDocumento);
//Editar documento
router.put('/files/:nro', editarDocumento);
//Obtener expediente por numero
router.get('/files/:nro', obtenerDocumentoPorNumero);

module.exports = router;