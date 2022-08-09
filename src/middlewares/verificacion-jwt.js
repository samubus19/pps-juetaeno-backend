const jwt            = require("jsonwebtoken");
const config         = require('config');
const { secret_key } = config.get('services.token');   


const verificarToken = (req, res, next) => {
    const bearerHeader    =  req.headers['authorization'];

    if(typeof bearerHeader !== 'undefined'){
        
        const bearerToken = bearerHeader.split(" ")[0];
        req.token         = bearerToken;
        
        jwt.verify(req.token, secret_key, (error, authData) => {
            if(error) {
                
                res.status(403).json({
                    mensaje :"No se ha provisto un token"
                });

            }else{
                console.log(authData);
                console.log("Token verificado correctamente");
                next();
            }
    });

    } else {
        res.status(403).json({
            mensaje :"No se ha provisto un token"
        });
    }
}

module.exports = { verificarToken };