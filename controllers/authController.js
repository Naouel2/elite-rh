const authService = require('../services/authService');

exports.createUser = async (req, res) => {
    try {
        const newUser = await authService.registerUser(req.body);
        res.status(201).json({
            message: 'User created successfully!',
            user: newUser
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.logUser = async (req, res) => {
    try {
        const token = await authService.logUser(req.body);
        res.status(200).json({
            message: 'User logged in successfully!',
            token: token
        });
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message });
    }
};
