const RoleUtilisateur = require('../models/RoleUtilisateur');

// Function to create a role
async function createRole(roleData) {
    try {
        // Create the role in the database
        const role = await RoleUtilisateur.create(roleData);

        return role;
    } catch (error) {
        throw error;
    }
}

// Function to get a role
async function getRoleIdByName(roleName) {
    try {
        // Find the role by name
        const role = await RoleUtilisateur.findOne({
            where: { role: roleName },

        });

        return role;
    } catch (error) {
        throw error;
    }
}

// Export the functions
module.exports = {
    createRole,
    getRole
};