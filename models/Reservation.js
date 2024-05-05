const Sequelize = require('sequelize');
const db = require('../config/database');

// Création du modèle Réservation
const Reservation = db.define('Reservation', {
    
    numero_reservation :{
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    } ,
    date_debut_formation : {
        type: Sequelize.DATE,
        allowNull: false,
    },
    date_fin_formation : {
        type: Sequelize.DATE,
        allowNull: false,
    },
  
});

module.exports = Reservation;
