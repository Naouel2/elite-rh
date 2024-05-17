const bcrypt = require('bcrypt');
const { where } = require('sequelize');
const Utilisateur = require('../config/index').Utilisateur;

async function getAllUsers() {
    return await Utilisateur.findAll({
         attributes: [
            'id', 
            'nom_utilisateur',
            'prenom_utilisateur',
            'email_utilisateur',
            'telephone_utilisateur',
            'role_id',
            'createdAt',
            'updatedAt'
        ]       
    });
}

async function getUser(id) {
    return await Utilisateur.findByPk(id);
}

async function getUserByEmail(email) {
    return await Utilisateur.findOne({
        where: {email_utilisateur: email}
    });
}

async function createUser(userData) {
    try {
        // Create the user in the database and associate it with the role
        const newUser = await Utilisateur.create(userData);
        return newUser;
    } catch (error) {
        throw error;
    }
}

async function updateUser(id, updatedData) {
    try {
        // Fetch the existing user
        const user = await getUser(id);
        if (!user) {
            throw new Error('User not found');
        }

        // Check if password needs to be updated and hash it
        if (updatedData.mdp_utilisateur) {
            updatedData.mdp_utilisateur = await bcrypt.hash(updatedData.mdp_utilisateur, 10);
        }

        // Update the user data
        await Utilisateur.update(
            updatedData,
            {
                where: {id: id},
            }
        );
        const updatedUser = await getUser(id);
        return updatedUser;
    } catch (error) {
        throw error;
    }
}

async function deleteUser(id) {
    try {

        // Check if user exists
        const user = await getUser(id);
        if (!user) {
            throw new Error('User not found');
        }
        // Delete the user in the database
        await Utilisateur.destroy({
            where: {id: id }
        });
    } catch (error) {
        throw error;
    }
}


module.exports = {
    getAllUsers,
    getUser,
    getUserByEmail,
    createUser,
    updateUser,
    deleteUser
};