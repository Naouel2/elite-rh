const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtOptions = require('../config/jwtOptions').jwtOptions;
const utilisateurService = require('../services/utilisateurService');

async function registerUser(userData) {
    try {
        const existingUser = await utilisateurService.getUserByEmail(userData.email_utilisateur);
        if (existingUser) {
            throw new Error('Email already exists');
        }

        const hashedPassword = await bcrypt.hash(userData.mdp_utilisateur, 10);

        let roleId;
        if (userData.role === 'admin') {
            roleId = 1;
        } else if (userData.role === 'manager-rh') {
            roleId = 2;
        } else {
            throw new Error('Invalid role specified');
        }

        const newUser = await utilisateurService.createUser({
            nom_utilisateur: userData.nom_utilisateur,
            prenom_utilisateur: userData.prenom_utilisateur,
            email_utilisateur: userData.email_utilisateur,
            mdp_utilisateur: hashedPassword,
            telephone_utilisateur: userData.telephone_utilisateur,
            role_id: roleId
        });

        return newUser;
    } catch (error) {
        throw error;
    }
}

async function logUser(userCredentials) {
    const { email_utilisateur, mdp_utilisateur } = userCredentials;

    if (!email_utilisateur || !mdp_utilisateur) {
        throw new Error('Email and password are required');
    }

    const user = await utilisateurService.getUserByEmail(email_utilisateur);
    if (!user) {
        throw new Error('No such user found');
    }

    const isMatch = await bcrypt.compare(mdp_utilisateur, user.mdp_utilisateur);
    if (!isMatch) {
        throw new Error('Incorrect password');
    }

    const payload = { id: user.id, email: user.email_utilisateur, role: user.role_id };
    const token = jwt.sign(payload, jwtOptions.secretOrKey);

    return token;
}

module.exports = {
    registerUser,
    logUser,
};
