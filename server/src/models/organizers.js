const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Organizer = sequelize.define('Organizer', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  first_name: {
    type: DataTypes.STRING,
    allowNull: true
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: true
  },
  second_name: {
    type: DataTypes.STRING,
    allowNull: true
  },
  organization_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  login_code: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: true
  },
  category_id: {              // ✅ ГЛАВНОЕ ПОЛЕ
    type: DataTypes.INTEGER,
    allowNull: false
  },
}, {
  tableName: 'organizers',
  timestamps: false,
  underscored: true
});

module.exports = Organizer;