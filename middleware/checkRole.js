module.exports = (roles) => {
    return (req, res, next) => {
        if (req.userData && roles.includes(req.userData.role)) {
            next();
        } else {
            return res.status(403).json({
                message: 'Access denied'
            });
        }
    };
};
