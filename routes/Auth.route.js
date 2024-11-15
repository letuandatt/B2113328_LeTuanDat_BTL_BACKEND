const express = require("express");
const authController = require("../controllers/Auth.controller");
const router = express.Router();
const authmdw = require("../middlewares/authentication.middleware");

router.route('/login').post(authController.login);
router.route('/register').post(authController.register);
// router.route('/logout').post(authController.logout, authmdw.checkRole(['admin', 'nhanvien', 'docgia']))

module.exports = router;