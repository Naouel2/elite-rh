const Sequelize = require('sequelize');
const db = require('../config/database');

// Création du modèle Formation
const Formation = db.define('formation', {

    nom_formation: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    domaine_formation: {
        type: Sequelize.STRING,
    },
    description_formation: {
        type: Sequelize.TEXT,
        allowNull: false
    }
   
});

module.exports = Formation;
