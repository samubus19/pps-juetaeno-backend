verificarRol = (req, res, next) => {
    try {
        const { rol } = req.body;
        if(rol.toLowerCase() == 'usuario') {
            return res.status(403).json({ mensaje : "Acceso denegado" });
        } else if(rol.toLowerCase() == 'admin'){
            console.log("Rol verificado correctamente")
            // res.status(200).json({ mensaje : "Rol verificado correctamente" });
            next();
        }

    } catch(error) {
        console.log(error);
        return res.status(500).json({mensaje : error});
    }
}

module.exports = { verificarRol };