var express = require('express');

var router = express.Router();
var authenticate = require('../../middlewares/authenticate.middleware');
var work_time_controller = require('../../controllers/works/work_time.controller');

router.get('/', authenticate, work_time_controller.readAll);
router.get('/:id', authenticate, work_time_controller.read);
router.post('/', authenticate, work_time_controller.create);
router.put('/:id', authenticate, work_time_controller.update);
router.delete('/:id', authenticate, work_time_controller.delete);
router.post('/deleteSelected', authenticate, work_time_controller.deleteMany);

module.exports = router;