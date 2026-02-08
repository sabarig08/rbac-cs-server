const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Permission = sequelize.define('Permission', {
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
  description: { type: DataTypes.STRING }
}, { timestamps: true });

module.exports = Permission;
