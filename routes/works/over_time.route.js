var express = require('express');

var router = express.Router();
var authenticate = require('../../middlewares/authenticate.middleware');
var over_time_controller = require('../../controllers/works/over_time.controller');

router.get('/', authenticate, over_time_controller.readAll);
router.get('/:id', authenticate, over_time_controller.read);
router.post('/', authenticate, over_time_controller.create);
router.put('/:id', authenticate, over_time_controller.update);
router.delete('/:id', authenticate, over_time_controller.delete);
router.post('/deleteSelected', authenticate, over_time_controller.deleteMany);

module.exports = router;