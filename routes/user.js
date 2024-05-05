const express = require('express');
const router = express.Router();
const Utilisateur = require('../config/index').Utilisateur;

const getAllUsers = async () => {
    return await Utilisateur.findAll();
};

router.get('/', function(req, res) {
    getAllUsers().then(user => res.json(user));
});



module.exports = router;


