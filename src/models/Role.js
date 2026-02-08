// const { DataTypes } = require('sequelize');
// const sequelize = require('../config/db');

// const Role = sequelize.define('Role', {
//   name: { type: DataTypes.STRING, unique: true, allowNull: false }
// }, { timestamps: true });

// module.exports = Role;
// // export default Role
const db = require('../config/db');

async function createRole(name) {
  const [result] = await db.query(
    'INSERT INTO roles (name) VALUES (?)',
    [name]
  );
  return result.insertId;
}

async function findRoleByName(name) {
  const [rows] = await db.query(
    'SELECT * FROM roles WHERE name = ?',
    [name]
  );
  return rows[0];
}

module.exports = { createRole, findRoleByName };
