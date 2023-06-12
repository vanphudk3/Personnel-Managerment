var express = require('express');

var router = express.Router();
var authenticate = require('../../middlewares/authenticate.middleware');
var break_time_controller = require('../../controllers/works/break_time.controller');

router.get('/', authenticate, break_time_controller.readAll);
router.get('/:id', authenticate, break_time_controller.read);
router.post('/', authenticate, break_time_controller.create);
router.put('/:id', authenticate, break_time_controller.update);
router.delete('/:id', authenticate, break_time_controller.delete);
// router.post('/deleteSelected', authenticate, break_time_controller.deleteMany);

module.exports = router;