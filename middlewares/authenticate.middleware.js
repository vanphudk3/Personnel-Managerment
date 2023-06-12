var jwt = require('jsonwebtoken');

var db = require('../config');
const { use } = require('passport');
const user = require('../models/user');
const role = require('../models/role');

var authenticate = function authenticate(req, res, next) {
    try {
        var token = jwt.verify(req.headers['x-access-token'], process.env.JWT_SECRET);
        if (!token) {
            return res.status(401).json({
                auth: false,
                message: 'Unauthorized.',
            });
        }
        db.query('SELECT a.* FROM users a WHERE a.id = ?', [token.id], async function (err, users) {
            if (err) {
                return res.status(500).json({
                    auth: false,
                    message: 'Database error.'
                });
            }
            if (users.length === 0) {
                return res.status(404).json({
                    auth: false,
                    message: 'No user found.',
                });
            }
            req.user = users[0];
            token = req.user.token;
            next();
        });
        
    } catch (err) {
        if (err instanceof jwt.TokenExpiredError) {
            return res.status(401).json({
                auth: false,
                message: 'Token expired.',
            });
        }
        else if (err instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({
                auth: false,
                message: 'Invalid token.',
            });
        }
        else {
            return res.status(401).json({
                auth: false,
                message: 'Unauthorized!!!',
            });
        }
    }
};

module.exports = authenticate;
