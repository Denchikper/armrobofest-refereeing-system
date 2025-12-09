const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Team = sequelize.define('Team', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  team_name: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  tableName: 'teams',
  timestamps: false,
  underscored: true
});

module.exports = Team;