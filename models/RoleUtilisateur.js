const Sequelize = require('sequelize');
const db = require('../config/database');

// Création du modèle RoleUtilisateur
const RoleUtilisateur = db.define('role_utilisateurs', {
    role: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
});

module.exports = RoleUtilisateur;
