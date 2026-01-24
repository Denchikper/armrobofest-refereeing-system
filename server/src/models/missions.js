const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Mission = sequelize.define('Mision', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  category_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  enabled: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  mission_number: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  criteria: {
    type: DataTypes.JSON,
    allowNull: false,
  }
}, {
  tableName: 'missions',
  timestamps: false,
  underscored: true
});

module.exports = Mission;
