const Utilisateur = require('../config/index').Utilisateur;

exports.getAllUsers = async (_req, res) =>{
    return await Utilisateur.findAll().then(user => res.json(user));
}