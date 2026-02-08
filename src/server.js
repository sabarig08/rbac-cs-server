// const express = require('express');
// const cors = require('cors');
// const morgan = require('morgan');
// const sequelize = require('./config/db');
// require('dotenv').config();

// const authRoutes = require('./routes/authRoutes');
// const adminRoutes = require('./routes/adminRoutes');

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());
// app.use(morgan('dev'));

// // Sync DB
// sequelize.sync({ alter: true })
//   .then(() => console.log('MySQL connected & synced'))
//   .catch(err => console.error(err));

// // Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/admin', adminRoutes);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));


const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const db = require('./config/db'); // mysql2 pool
const orderRoutes = require('./routes/orderRoutes');
const employeeRoutes = require('./routes/employeeRoutes');




const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Test DB connection
(async () => {
  try {
    await db.query('SELECT 1');
    console.log('✅ MySQL connected');
  } catch (err) {
    console.error('❌ MySQL connection failed:', err);
  }
})();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/employees', employeeRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));