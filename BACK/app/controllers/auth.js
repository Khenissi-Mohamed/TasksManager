const jwt = require('jsonwebtoken');

const secret = 'secret'; 

// Fonction pour créer un token JWT
function createToken(user) {
  // les données à stocker dans le token
  const payload = {
    userId: user.id,
    email: user.email,
    // ajoutez ici d'autres propriétés si nécessaire
  };

  // crée le token avec la clé secrète et une durée de validité de 1 heure
  const token = jwt.sign(payload, secret, { expiresIn: '1h' });

  return token;
}

// Fonction pour vérifier un token JWT
function verifyToken(req, res, next) {
  // récupère le token dans le header Authorization
  const token = req.headers.authorization?.split(' ')[1];

  // vérifie si le token est présent
  if (!token) {
    return res.status(401).json({ message: 'Token non fourni' });
  }

  try {
    // vérifie le token avec la clé secrète
    const decodedToken = jwt.verify(token, secret);
    // ajoute les données du token à l'objet req
    req.userData = { userId: decodedToken.userId, email: decodedToken.email };
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token invalide' });
  }
}

module.exports = { createToken, verifyToken };
