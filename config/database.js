const Sequelize = require('sequelize');
const RoleUtilisateur = require('../models/RoleUtilisateur');
const Utilisateur = require('../models/Utilisateur');
const Formateur = require('../models/Formateur');
const Reservation = require('../models/Reservation');
const Salle = require('../models/Salle');
const Formation = require('../models/Formation');

require('dotenv').config()

const database = new Sequelize(process.env.DB_URL, {
  dialect: 'mysql',
  dialectModule: require('mysql2')
});

// Relations Utilisateur-Roles :
Utilisateur.belongsToMany(RoleUtilisateur, { through: 'Detenir', foreignKey: 'id_utilisateur' });
RoleUtilisateur.belongsToMany(Utilisateur, { through: 'Detenir', foreignKey: 'id_role_utilisateur' });

// Relations pour Reservation :
Reservation.belongsTo(Utilisateur, { foreignKey: 'id_utilisateur' });
Reservation.belongsTo(Formateur, { foreignKey: 'id_formateur' });
Reservation.belongsTo(Salle, { foreignKey: 'id_salle' });
Reservation.belongsTo(Formation, { foreignKey: 'id_formation' });

Utilisateur.hasMany(Reservation, { foreignKey: 'id_utilisateur' });
Formateur.hasMany(Reservation, { foreignKey: 'id_formateur' });
Salle.hasMany(Reservation, { foreignKey: 'id_salle' });
Formation.hasMany(Reservation, { foreignKey: 'id_formation' });

module.exports = database;

