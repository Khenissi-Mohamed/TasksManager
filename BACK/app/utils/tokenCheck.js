const jwt = require('jsonwebtoken');


const tokenCheck = async (req, res, next) => {
    
    //------------------VERIFICATION TOKEN------------------//

    const authHeader = req.headers.authorization;

    if (!authHeader) {
        res.status(401).json("Vous n'êtes pas connecté");
        return;
    }
    
    const token = authHeader.split(' ')[1];


    const decoded = jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) { // on verifie le token avec la clef secrete
        if (err) {
            res.status(401).json("token invalide");
            console.log('probleme token')
            return;
    
        }
        return decoded
        
    })
    
    req.user = decoded; // on stock les données du token dans req.user

    if (!decoded) {
        return new Error("token invalide ou expiré");
      }

      console.log('token ok')
      next()

}

module.exports = tokenCheck;
