const express = require('express');
const userRoutes = express.Router();
const userController = require('../controllers/utilisateurControllers');

userRoutes.get('/', userController.getAllUsers);

module.exports = userRoutes;