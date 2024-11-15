const express = require('express');
const theoDoiMuonSachController = require('../controllers/TheoDoiMuonSach.controller');
const router = express.Router();

router.post('/muonsach', theoDoiMuonSachController.muonSach);
router.put('/trasach/:id', theoDoiMuonSachController.traSach);
router.get('/', theoDoiMuonSachController.getAllTDMS);
router.get('/docgia/:id', theoDoiMuonSachController.getAllTDMSByDocGia)
router.get('/sach/:id', theoDoiMuonSachController.getAllTDMSBySach);
router.get('/sachcosan/:id', theoDoiMuonSachController.checkSachAvailable);

module.exports = router;
