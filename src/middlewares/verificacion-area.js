const verficarMesaDeEntrada = (req, res, next) => {
    try {
        const { area } = req.body;
        if(area.trim().toLowerCase() != 'mesa de entrada'.toLowerCase()) {
            return res.status(403).json({ mensaje : "Acceso denegado" });
        } else {
            res.status(200).json({ mensaje : "Area verificada correctamente" });
            next();
        }

    } catch(error) {
        return res.status(500).json({mensaje : error});
    }
}

const verficarLegales = (req, res, next) => {
    try {
        const { area } = req.body;
        if(area.trim().toLowerCase() != 'legales'.toLowerCase()) {
            return res.status(403).json({ mensaje : "Acceso denegado" });
        } else {
            res.status(200).json({ mensaje : "Area verificada correctamente" });
            next();
        }

    } catch(error) {
        return res.status(500).json({mensaje : error});
    }
}


module.exports = { verficarMesaDeEntrada, verficarLegales }