const Sequelize = require('sequelize');
const db = require('../config/database');

// creation of the User model
const User = db.define('product', {

    description: {
        type: Sequelize.STRING,
        allowNull: false
    },
    price: {
        type: Sequelize.DOUBLE,
    }
   
});


module.exports = User;
