const { Router } = require("express");
const { verificarTokenControlador } = require("../middlewares/verificacion-jwt");


const router = Router();

//Obtener listado de expedientes
router.get("/verifyjwt", verificarTokenControlador);


module.exports = router;
