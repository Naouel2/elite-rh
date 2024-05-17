const sequelize = require('./database');
const RoleUtilisateur = require('../models/RoleUtilisateur');
const Utilisateur = require('../models/Utilisateur');
const Formateur = require('../models/Formateur');
const Reservation = require('../models/Reservation');
const Salle = require('../models/Salle');
const Formation = require('../models/Formation');

// Relations Utilisateur-Roles :
Utilisateur.hasOne(RoleUtilisateur, { foreignKey: 'role_id' });

// Other relations
Reservation.belongsTo(Utilisateur, { foreignKey: 'id_utilisateur' });
Reservation.belongsTo(Formateur, { foreignKey: 'id_formateur' });
Reservation.belongsTo(Salle, { foreignKey: 'id_salle' });
Reservation.belongsTo(Formation, { foreignKey: 'id_formation' });

Utilisateur.hasMany(Reservation, { foreignKey: 'id_utilisateur' });
Formateur.hasMany(Reservation, { foreignKey: 'id_formateur' });
Salle.hasMany(Reservation, { foreignKey: 'id_salle' });
Formation.hasMany(Reservation, { foreignKey: 'id_formation' });

module.exports = {
    sequelize,
    RoleUtilisateur,
    Utilisateur,
    Formateur,
    Reservation,
    Salle,
    Formation
  };