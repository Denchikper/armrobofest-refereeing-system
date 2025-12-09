const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Judge = sequelize.define('Judge', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },

  first_name: DataTypes.STRING,
  last_name: DataTypes.STRING,
  second_name: DataTypes.STRING,

  organization_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },

  category_id: {              // ✅ ГЛАВНОЕ ПОЛЕ
    type: DataTypes.INTEGER,
    allowNull: false
  },

  login_code: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  }

}, {
  tableName: 'judges',
  timestamps: false,
  underscored: true
});

module.exports = Judge;
