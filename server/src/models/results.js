const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Result = sequelize.define('Result', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  participant_id: {
    type: DataTypes.UUID,
    allowNull: false
    },
  judge_id: {
    type: DataTypes.UUID,
    allowNull: false
  },
  mission_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  result: {
    type: DataTypes.JSON,
    allowNull: false
  }
}, {
  tableName: 'results',
  timestamps: true,
  underscored: true
});

module.exports = Result;