const express = require("express");
const nhanVienController = require("../controllers/NhanVien.controller");
const router = express.Router();

router.get("/", nhanVienController.getAll);
router.post("/", nhanVienController.create);
router.get('/:id', nhanVienController.getById);
router.put('/:id', nhanVienController.update);
router.delete('/:id', nhanVienController.delete);

module.exports = router;