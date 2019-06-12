// const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// const Users = require('../users/users-model.js');
const secrets = require('../config/secrets.js')


module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, secrets.jwtSecret, (err, decodeToken) => {
      if (err) {
        //invalid token for any reason
        res.status(401).json({ message: 'Invalid ' });
      } else {
        //valid token
        req.user = {roles: decodeToken.roles, username: decodeToken.username };
        next();
      }
    });
  } else {
    res.status(400).json({ message: 'No token provided!'});
  }
};

//     Users.findBy({ username })
//       .first()
//       .then(user => {
//         if (user && bcrypt.compareSync(password, user.password)) {
//           next();
//         } else {
//           res.status(401).json({ message: 'Invalid Credentials' });
//         }
//       })
//       .catch(error => {
//         res.status(500).json({ message: 'Ran into an unexpected error' });
//       });
//   } else {
//     res.status(400).json({ message: 'No token provided' });
//   }
// };
