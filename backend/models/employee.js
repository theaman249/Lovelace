const { DataTypes } = require('sequelize');
const sequelize = require('../seq_init'); // Assuming db.js exports the Sequelize instance


const Employee = sequelize.define('employees', {
   name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  surname: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phone_number: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  birthday: {
    type: DataTypes.DATE,
    allowNull: false
  },
  reset_token: {
    type: DataTypes.STRING, 
    allowNull: true 
  },
  token_expiration: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  timestamps: false,
  createdAt: false,
  updatedAt: false
});


module.exports = Employee;
