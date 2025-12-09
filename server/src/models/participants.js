const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Participant = sequelize.define('Participant', {
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
  team_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  class: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  login_code: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: true
  },
  supervisor_full_name: {
    type: DataTypes.STRING,
    allowNull: true
  },
  category_id: {               // ✅ добавляем категорию
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'participants',
  timestamps: false,
  underscored: true
});

module.exports = Participant;
