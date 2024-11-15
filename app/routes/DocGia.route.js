const express = require("express");
const docGiaController = require("../controllers/DocGia.controller");
const router = express.Router();

router.route("/").get(docGiaController.getAll);
router.route('/:id').get(docGiaController.getById);
router.route('/').post(docGiaController.create);
router.route('/:id').delete(docGiaController.delete);
router.route("/:id").put(docGiaController.update);

module.exports = router;