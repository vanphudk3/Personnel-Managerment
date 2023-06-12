var express = require('express');

var router = express.Router();
var authenticate = require('../../middlewares/authenticate.middleware');
var break_time_log_controller = require('../../controllers/works/break_time_log.controller');

router.get('/', authenticate, break_time_log_controller.readAll);
router.get('/:id', authenticate, break_time_log_controller.read);
router.post('/', authenticate, break_time_log_controller.create);
router.put('/:id', authenticate, break_time_log_controller.update);
router.delete('/:id', authenticate, break_time_log_controller.delete);
// router.post('/deleteSelected', authenticate, break_time_log_controller.deleteMany);

module.exports = router;