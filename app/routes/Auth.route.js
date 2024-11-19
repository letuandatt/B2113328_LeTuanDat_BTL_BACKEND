const express = require("express");
const authController = require("../controllers/Auth.controller");
const router = express.Router();

router.route('/login').post(authController.login);
router.route('/register').post(authController.register);

module.exports = router;