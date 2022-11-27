const { Router } = require("express");
const { verificarToken } = require("../middlewares/verificacion-jwt");
const {
  crearNuevoDocumento,
  actualizarEstadoDocumento,
  editarDocumento,
  obtenerDocumentos,
  obtenerDocumentoPorNumero,
} = require("../controllers/documento.controller");

const router = Router();

//Obtener listado de expedientes
router.get("/files",       verificarToken, obtenerDocumentos);
//Crear nuevo registro de expediente
router.post("/files",      verificarToken, crearNuevoDocumento);
//Actualizar estado de expediente
router.put("/files/state", verificarToken, actualizarEstadoDocumento);
//Editar documento
router.put("/files",       verificarToken, editarDocumento);
//Obtener expediente por numero
router.get("/files/:nro",  verificarToken, obtenerDocumentoPorNumero);

module.exports = router;
