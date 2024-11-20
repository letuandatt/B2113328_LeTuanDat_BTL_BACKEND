const express = require("express");
const authController = require("../controllers/Auth.controller");
const router = express.Router();

router.route('/login').post(authController.login);
router.route('/register').post(authController.register);
router.route('/logout').post(authController.logout);

module.exports = router;