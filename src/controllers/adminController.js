// const { Role, Permission } = require('../models');

// exports.createRole = async (req, res) => {
//   try {
//     const role = await Role.create(req.body);
//     res.status(201).json(role);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// };

// exports.createPermission = async (req, res) => {
//   try {
//     const permission = await Permission.create(req.body);
//     res.status(201).json(permission);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// };

// exports.assignPermissionToRole = async (req, res) => {
//   try {
//     const { roleId, permissionId } = req.body;
//     const role = await Role.findByPk(roleId);
//     const permission = await Permission.findByPk(permissionId);
//     await role.addPermission(permission);
//     res.json({ message: 'Permission assigned successfully' });
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// };


const db = require('../config/db');

// Create a new role
async function createRole(req, res) {
  const { name } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO rbac.roles (name) VALUES (?)',
      [name]
    );
    res.status(201).json({ message: 'Role created', id: result.insertId });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

// Create a new permission
async function createPermission(req, res) {
  const { name } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO rbac.permissions (name) VALUES (?)',
      [name]
    );
    res.status(201).json({ message: 'Permission created', id: result.insertId });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

// Assign a permission to a role
async function assignPermissionToRole(req, res) {
  const { roleId, permissionId } = req.body;
  try {
    await db.query(
      'INSERT INTO rbac.role_permissions (role_id, permission_id) VALUES (?, ?)',
      [roleId, permissionId]
    );
    res.json({ message: 'Permission assigned successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

module.exports = { createRole, createPermission, assignPermissionToRole };