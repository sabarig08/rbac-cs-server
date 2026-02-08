// const jwt = require('jsonwebtoken');
// const db = require('../config/db'); // mysql2 pool

// const auth = async (req, res, next) => {
//   const token = req.header('Authorization')?.replace('Bearer ', '');
//   if (!token) return res.status(401).json({ error: 'No token provided' });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_KEY); // use JWT_KEY from .env

//     // Query user with role info
//     const [rows] = await db.query(
//       `SELECT u.id, u.name, u.email, r.name AS role 
//        FROM users u 
//        LEFT JOIN roles r ON u.role_id = r.id 
//        WHERE u.id = ?`,
//       [decoded.id]
//     );

//     const user = rows[0];
//     if (!user) return res.status(401).json({ error: 'Invalid token' });

//     req.user = user; // attach user + role to request
//     next();
//   } catch (err) {
//     res.status(401).json({ error: 'Unauthorized' });
//   }
// };


// module.exports = auth;



const jwt = require('jsonwebtoken');

function authenticate(req, res, next) {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.user = decoded; // { id, role }
    next();
  } catch (err) {
    res.status(401).json({ error: 'Unauthorized' });
  }
}

function authorizeRole(requiredRole) {
  return (req, res, next) => {
    if (req.user.role !== requiredRole) {
      return res.status(403).json({ error: 'Forbidden: insufficient role' });
    }
    next();
  };
}

module.exports = { authenticate, authorizeRole };
