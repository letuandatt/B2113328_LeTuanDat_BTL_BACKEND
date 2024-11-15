const express = require('express');
const nhaXuatBanController = require('../controllers/NhaXuatBan.controller');
const router = express.Router();

router.get('/', nhaXuatBanController.getAll);
router.post('/', nhaXuatBanController.create);
router.get('/:id', nhaXuatBanController.getById);
router.put('/:id', nhaXuatBanController.update);
router.delete('/:id', nhaXuatBanController.delete);

module.exports = router;