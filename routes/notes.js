var express = require('express');
var router = express.Router();
var controller = require('../controller/noteController');

router.get('/', controller.showIndex);
router.post('/notes', controller.add);
router.get('/notes/new', controller.addForm);

router.get('/notes/:id', controller.editForm);
router.post('/notes/:id', controller.edit);
// TODO use put for update
// TODO to allow put, add method override

module.exports = router;
