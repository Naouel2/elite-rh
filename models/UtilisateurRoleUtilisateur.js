const Sequelize = require('sequelize');
const db = require('../config/database');

// Création du modèle UtilisateurRoleUtilisateur sans les colonnes explicites
const UtilisateurRoleUtilisateur = db.define('UtilisateurRoleUtilisateur', {}, { timestamps: false });

module.exports = UtilisateurRoleUtilisateur;
