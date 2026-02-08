const db = require('../config/db');

// requiredPermissions = ['employees:view', 'orders:edit']
const rbac = (requiredPermissions) => {
  return async (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).json({ error: 'Unauthorized: no user context' });
      }

      // Get role_id from user
      const roleId = req.user.role_id;

      // Query permissions for this role
      const [rows] = await db.query(
        `SELECT p.name 
         FROM rbac.permissions p
         JOIN rbac.role_permissions rp ON rp.permission_id = p.id
         WHERE rp.role_id = ?`,
        [roleId]
      );

      const userPermissions = rows.map(p => p.name);

      // Check if user has all required permissions
      const hasPermission = requiredPermissions.every(p => userPermissions.includes(p));
      if (!hasPermission) {
        return res.status(403).json({ error: 'Forbidden: insufficient permissions' });
      }

      next();
    } catch (err) {
      res.status(500).json({ error: 'RBAC check failed', details: err.message });
    }
  };
};

module.exports = rbac;