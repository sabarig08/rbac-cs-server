const express = require('express');
const { authenticate, authorizeRole } = require('../middleware/auth');
const employeeController = require('../controllers/employeeController');
const router = express.Router();

// View (accessible to all authenticated users)
router.get('/', authenticate, employeeController.getEmployees);

// Admin-only actions
router.post('/', authenticate, authorizeRole('Admin'), employeeController.createEmployee);
router.put('/:id', authenticate, authorizeRole('Admin'), employeeController.updateEmployee);
router.delete('/:id', authenticate, authorizeRole('Admin'), employeeController.deleteEmployee);

module.exports = router;