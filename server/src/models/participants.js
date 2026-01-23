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
    allowNull: false
  },
  second_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  organization_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  team_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  pod_team_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  class: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  login_code: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  category_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'participants',
  timestamps: true,
  underscored: true
});

module.exports = Participant;
