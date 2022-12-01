const jwt            = require("jsonwebtoken");
const config         = require('config');
const { secret_key } = config.get('services.token');   


const verificarToken = (req, res, next) => {
    const bearerHeader    =  req.headers['authorization'];

    try {
        
        if(typeof bearerHeader !== 'undefined'){
            
            const bearerToken = bearerHeader.split(" ")[0];
            req.token         = bearerToken;
            
            jwt.verify(req.token, secret_key, (error, authData) => {
                if(error) {
                    
                    res.status(403).json({
                        statusCode : 403,
                        mensaje    :"No se ha provisto un token o su token ha expirado"
                    });

                }else{
                    next();
                }
        });

    } else {
        res.status(403).json({
            mensaje :"No se ha provisto un token"
        });
    }
    } catch(error) {
        console.log(error);
    }

}

const verificarTokenControlador = async (req, res, next) => {
    const bearerHeader    =  req.headers['authorization'];

    try {
        
        if(typeof bearerHeader !== 'undefined'){
            
            const bearerToken = bearerHeader.split(" ")[0];
            req.token         = bearerToken;
            
            jwt.verify(req.token, secret_key, (error, authData) => {
                if(error) {
                    
                    res.status(403).json({
                        valido     : false,
                        statusCode : 403,
                        mensaje    :"No se ha provisto un token o su token ha expirado"
                    });

                }else{
                    return res.status(200).json({
                        valido        : true,
                        requestStatus : 200,
                        mensaje       : "Token válido."
                    })
                }
        });

    } else {
        res.status(403).json({
            valido  : false,
            mensaje :"No se ha provisto un token"
        });
    }
    } catch(error) {
        console.log(error);
    }

}

module.exports = { verificarToken, verificarTokenControlador };