const express = require('express');
const authController = require('../controllers/authController');

const authRoutes = express.Router();

// POST /login
authRoutes.post('/login', authController.logUser);

// Register a new user POST /register
authRoutes.post('/register', authController.createUser);

module.exports = authRoutes;
