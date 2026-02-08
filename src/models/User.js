// const { DataTypes } = require('sequelize');
// const sequelize = require('../config/db');
const db = require('../config/db')
const bcrypt = require('bcryptjs');

// const User = sequelize.define('User', {
//   name: { type: DataTypes.STRING, allowNull: false },
//   email: { type: DataTypes.STRING, unique: true, allowNull: false },
//   password: { type: DataTypes.STRING, allowNull: false },
// }, { timestamps: true });

// User.beforeCreate(async (user) => {
//   user.password = await bcrypt.hash(user.password, 10);
// });

async function createUser(name, email, password, role_name = 'User') {
  const [roleRows] = await db.query(
    'SELECT name FROM rbac.roles WHERE name = ?',
    [role_name]
  );

  if (roleRows.length === 0) {
    throw new Error(`Role "${role_name}" does not exist in rbac.roles`);
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const [result] = await db.query(
    'INSERT INTO rbac.users (name, email, password, role_name) VALUES (?, ?, ?, ?)',
    [name, email, hashedPassword, role_name]
  );
  return result.insertId;
}

async function findUserByEmail(email) {
  const [rows] = await db.query(
    'SELECT * FROM rbac.users WHERE email = ?',
    [email]
  );
  return rows[0];
}


module.exports = { createUser, findUserByEmail }

// export default User