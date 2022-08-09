const rolMiddleware = {};


rolMiddleware.verificarRol = (req, res, next) => {
    try {
        
        const { rol } = req.body;
        if(rol == 'cliente') {
            return res.status(403).json({ mensaje : "Acceso denegado" });
        } else if(rol == 'admin'){
            res.status(200).json({ mensaje : "Rol verificado correctamente" });
            next();
        }

    } catch(e) {
        return res.status(500).json({mensaje : "Error en el servidor"});
    }
}

module.exports = rolMiddleware;