var express = require('express');

var router = express.Router();
var authenticate = require('../../middlewares/authenticate.middleware');
var work_schedule_controller = require('../../controllers/works/work_schedule.controller');

router.get('/', authenticate, work_schedule_controller.readAll);
router.get('/:id', authenticate, work_schedule_controller.read);
router.post('/', authenticate, work_schedule_controller.create);
router.put('/:id', authenticate, work_schedule_controller.update);
router.delete('/:id', authenticate, work_schedule_controller.delete);
router.post('/deleteSelected', authenticate, work_schedule_controller.deleteMany);

module.exports = router;