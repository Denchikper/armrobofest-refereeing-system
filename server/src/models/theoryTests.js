const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const TheoryTest = sequelize.define('TheoryTest', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  class: {
    type: DataTypes.JSON,
    allowNull: false
  },
  variant: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  count_questions: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  checkable_questions: {
    type: DataTypes.JSON,
    allowNull: false
  },
  answers: {
    type: DataTypes.JSON,
    allowNull: false
  }
}, {
  tableName: 'theory_tests',
  timestamps: true,
  underscored: true
});

module.exports = TheoryTest;