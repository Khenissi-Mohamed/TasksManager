const jwt = require('jsonwebtoken');
const userDatamapper = require('../datamappers/userDatamapper');
const bcrypt = require('bcrypt');

const secret = 'secret'; 

  //-------------Create Token-----------------//
async function createToken(req, res, next, data) {
  // les données à stocker dans le token
        const { email, password } = data;
        const user = await userDatamapper.findByEmail(email);
        
        if (user) {
            const passwordMatch = await bcrypt.compare(password, user.password);

            if (passwordMatch) {
              const token = jwt.sign({lastname : user.lastname, id: user.id}, secret, {expiresIn : '1h'})
                res.status(200).json({token, message : "Vous êtes connecté", id : user.id, lastname : user.lastname});
            } else {
                res.status(401).json("Mot de passe incorrect");
            }
        } else {
            res.status(401).json("Email incorrect");
        }
  
  };

  
module.exports = createToken;