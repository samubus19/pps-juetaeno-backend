verificarRol = (req, res, next) => {
    try {
        
        const { rol } = req.body;
        if(rol == 'usuario') {
            return res.status(403).json({ mensaje : "Acceso denegado" });
        } else if(rol == 'admin'){
            // res.status(200).json({ mensaje : "Rol verificado correctamente" });
            next();
        }

    } catch(error) {
        console.log(error);
        return res.status(500).json({mensaje : error});
    }
}

module.exports = { verificarRol };