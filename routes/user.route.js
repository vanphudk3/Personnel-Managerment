var express = require('express');
var router = express.Router();
var authenticate = require('../middlewares/authenticate.middleware');
var authenticateAdmin = require('../middlewares/authenticateAdmin.middleware');
var authenticateSuperAdmin = require('../middlewares/authenticateSuperAdmin.middleware');
var user_controller = require('../controllers/user.controller');
const { body } = require('express-validator');

router.get('/', [authenticate], user_controller.getUserbyRoleSuperAdmin);
router.get('/getByGroupAndDepartment', [authenticate], user_controller.getByGroupAndDepartment);
router.post('/getByGroupAndDepartment/deleteDepartmentSelected', [authenticate], user_controller.deleteDepartmentSelected);
router.get('/getByGroupAndNoDepartment', [authenticate], user_controller.getByGroupAndNoDepartment);
router.post('/getByGroupAndNoDepartment/:id/addDepartmentSelected', [authenticate], user_controller.addDepartmentSelected);

router.post('/', authenticate, [
    body('email').isEmail().withMessage('Email must be an email'),
    body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 chars long'),
    body('name').isLength({ min: 5 }).withMessage('Name must be at least 5 chars long'),
    body('phone').isLength({ min: 10 }).withMessage('Phone must be at least 10 chars long'),
], user_controller.create);

router.get('/profile', authenticate, user_controller.profile);

router.put('/profile', authenticate, user_controller.updateProfile);

// router.get('/getAdmin', authenticate, user_controller.getUserbyRoleAdmin);


router.post('/register', [
    body('email').isEmail().withMessage('Email must be an email'),
    body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 chars long'),
    body('name').isLength({ min: 5 }).withMessage('Name must be at least 5 chars long'),
    body('phone').isLength({ min: 10 }).withMessage('Phone must be at least 10 chars long'),
], user_controller.register);


router.post('/login', [
    body('email').isEmail().withMessage('Email must be an email'),
    body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 chars long'),
], user_controller.login);

router.post('/logout',function (req, res) {
    delete req.headers['x-access-token'];
    res.json({ auth: false, token: null });
});

router.get('/:id', authenticate, user_controller.read);

router.put('/:id', authenticate, [
    body('email').isEmail().withMessage('Email must be an email'),
    body('name').isLength({ min: 5 }).withMessage('Name must be at least 5 chars long'),
    body('phone').isLength({ min: 10 }).withMessage('Phone must be at least 10 chars long')
],user_controller.update);

router.delete('/:id', authenticate, user_controller.delete);
router.post('/deleteSelected', authenticate, user_controller.deleteMany);

module.exports = router;