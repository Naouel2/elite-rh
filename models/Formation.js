const Sequelize = require('sequelize');
const db = require('../config/database');

// Création du modèle Formation
const Formation = db.define('Formation', {

    nom_formation: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    domaine_formation: {
        type: Sequelize.STRING,
    }
   
});

module.exports = Formation;
