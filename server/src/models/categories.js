const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Category = sequelize.define('Category', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  sheetId: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'categories',
  timestamps: false,
  underscored: true
});

module.exports = Category;
