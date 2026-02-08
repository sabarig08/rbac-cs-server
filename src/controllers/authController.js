// const { User, Role } = require('../models');
// import User from '../module/User';
// // import Role from '../module/Role';
// const jwt = require('jsonwebtoken');
// const { createUser, }
// const bcrypt = require('bcryptjs');


// exports.register = async (req, res) => {
//   try {
//     const user = await User.create(req.body);
//     res.status(201).json(user);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// };

// exports.login = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ where: { email }, include: Role });
//     if (!user) return res.status(404).json({ error: 'User not found' });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

//     const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
//     res.json({ token, user });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };
const jwt = require('jsonwebtoken');
const { createUser, findUserByEmail } = require('../models/User');
const bcrypt = require('bcryptjs');

async function register(req, res) {
  const { name, email, password, role_name } = req.body;
  try {
    if (!role_name) {
      return res.status(400).json({ error: 'role_name is required' });
    }

    const userId = await createUser(name, email, password, role_name);

    const [rows] = await db.query('SELECT * FROM rbac.users WHERE id = ?', [userId]);
    const user = rows[0];
   
      const token = jwt.sign(
      { id: user.id, role: user.role_name.toLowerCase() }, // normalize role
      process.env.JWT_KEY,
      { expiresIn: '1h' }
    );


    res.json({
       message: 'User registered',
         token,
        user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role_name.toLowerCase()
      }
           

      });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function login(req, res) {
  // console.log(req,"TEST REQUEST")
  const { email, password } = req.body;
  try {
    const user = await findUserByEmail(email);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id, role: user.role_name }, process.env.JWT_KEY, { expiresIn: '1h' });
    res.json({ token, user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role_name
      }
 });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { register, login };