var express = require('express');

var router = express.Router();
var authenticate = require('../middlewares/authenticate.middleware');
var department_controller = require('../controllers/department.controller');

router.get('/', authenticate, department_controller.getAll);
router.get('/getDepartment', authenticate, department_controller.getAllDepartment);
router.get('/:id', authenticate, department_controller.read);
router.post('/', authenticate, department_controller.create);
router.put('/:id', authenticate, department_controller.update);
router.delete('/:id', authenticate, department_controller.delete);
router.post('/deleteSelected', authenticate, department_controller.deleteMany);

module.exports = router;