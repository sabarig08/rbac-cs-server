const db = require('../config/db');

// View orders (all users can view)
async function getOrders(req, res) {
  try {
    const [rows] = await db.query('SELECT id, product, quantity, price, customer FROM rbac.orders');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Create order (Admin only)
async function createOrder(req, res) {
  const { product, quantity, price, customer } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO rbac.orders (product, quantity, price, customer) VALUES (?, ?, ?, ?)',
      [product, quantity, price, customer]
    );    
    res.json({ message: 'Order created', id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Update order (Admin only)
async function updateOrder(req, res) {
  const { id } = req.params;
  const { product, quantity, price, customer } = req.body;
  try {
    await db.query(
      'UPDATE rbac.orders SET product=?, quantity=?, price=?, customer=? WHERE id=?',
      [product, quantity, price, customer, id]
    );
    res.json({ message: 'Order updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Delete order (Admin only)
async function deleteOrder(req, res) {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM rbac.orders WHERE id=?', [id]);
    res.json({ message: 'Order deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { getOrders, createOrder, updateOrder, deleteOrder };