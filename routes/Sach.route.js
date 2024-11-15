const express = require('express');
const sachController = require('../controllers/Sach.controller');
const router = express.Router();

router.get('/', sachController.getAll);
router.post('/', sachController.create);
router.get('/:id', sachController.getById);
router.put('/:id', sachController.update);
router.delete('/:id', sachController.delete);

module.exports = router;
