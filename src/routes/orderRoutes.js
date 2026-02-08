const express = require('express');
const { authenticate, authorizeRole } = require('../middleware/auth');
const orderController = require('../controllers/orderController');
const router = express.Router();

// View orders (all authenticated users)
router.get('/', authenticate, orderController.getOrders);

// Admin-only actions
router.post('/', authenticate, authorizeRole('Admin'), orderController.createOrder);
router.put('/:id', authenticate, authorizeRole('Admin'), orderController.updateOrder);
router.delete('/:id', authenticate, authorizeRole('Admin'), orderController.deleteOrder);

module.exports = router;