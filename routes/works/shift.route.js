var express = require('express');

var router = express.Router();
var authenticate = require('../../middlewares/authenticate.middleware');
var shift_controller = require('../../controllers/works/shift.controller');

router.get('/', authenticate, shift_controller.readAll);
router.get('/:id', authenticate, shift_controller.read);
router.post('/', authenticate, shift_controller.create);
router.put('/:id', authenticate, shift_controller.update);
router.delete('/:id', authenticate, shift_controller.delete);
router.post('/deleteSelected', authenticate, shift_controller.deleteMany);

module.exports = router;