var express = require('express');
var router = express.Router();
var db = require('../config');

var RoleController = require('../controllers/role.controller');
var authenticate = require('../middlewares/authenticate.middleware');
var { body, validationResult } = require('express-validator');

// Get all roles
router.get('/', authenticate, function(req, res) {
    if (req.user.role_id != '4') {
        return res.status(401).json({
            auth: false,
            message: 'Unauthorized.',
        });
    }
    RoleController.list(function(err, data) {
        if (err) {
            return res.status(500).json({ error: err });
        } else {
            return res.json(data);
        }
    });
});

// Get roles except role superadmin
router.get('/get/exsuperadmin', authenticate, function(req, res) {
    if (req.user.role_id == '4') {
        db.query('SELECT * FROM role WHERE id != 4', function(err, rows) {
            if (err) {
                return res.status(500).json({ error: err });
            } else {
                return res.json(rows);
            }
        });
    }
    else if (req.user.role_id == '1') {
        db.query('SELECT * FROM role WHERE id != 4 AND id != 1', function(err, rows) {
            if (err) {
                return res.status(500).json({ error: err });
            } else {
                return res.json(rows);
            }
        });
    }
    else {
        return res.status(401).json({
            auth: false,
            message: 'Unauthorized.',
        });
    }
});

// Get role by id
router.get('/:id', authenticate, function(req, res) {
    if (req.user.role !== 'admin') {
        return res.status(401).json({
            auth: false,
            message: 'Unauthorized.'
        });
    }
    RoleController.show(req.params.id, function(err, data) {
        if (err) {
            res.status(500).json({ error: err });
        } else if (!data) {
            res.status(404).json({ error: 'Role not found' });
        } else {
            res.json(data);
        }
    });
});

// Create new role
router.post('/', authenticate, function(req, res) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        if (req.user.role !== 'admin') {
            return res.status(401).json({
                auth: false,
                message: 'Unauthorized.'
            });
        }
        RoleController.create(req.body, function(err, data) {
            if (err) {
                res.status(500).json({ error: err });
            } else {
                res.json(data);
            }
        });
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
});

// Update role by id
router.put('/:id', authenticate, function(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    if (req.user.role !== 'admin') {
        return res.status(401).json({
            auth: false,
            message: 'Unauthorized.'
        });
    }
    RoleController.update(req.params.id, req.body, function(err, data) {
        if (err) {
            res.status(500).json({ error: err });
        } else if (!data) {
            res.status(404).json({ error: 'Role not found' });
        } else {
            res.json(data);
        }
    });
});

// Delete role by id
router.delete('/:id', authenticate, function(req, res) {
    if (req.user.role !== 'admin') {
        return res.status(401).json({
            auth: false,
            message: 'Unauthorized.'
        });
    }
    RoleController.delete(req.params.id, function(err, count) {
        if (err) {
            res.status(500).json({ error: err });
        } else if (!count) {
            res.status(404).json({ error: 'Role not found' });
        } else {
            res.json(count);
        }
    });
});



module.exports = router;
