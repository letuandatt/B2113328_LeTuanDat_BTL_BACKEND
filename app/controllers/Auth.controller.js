const mongoose = require("mongoose");
const brcypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ApiError = require("../api-error");
const DocGia = require("../models/DocGia.model");
const NhanVien = require("../models/NhanVien.model");

exports.registerDocGia = async (req, res, next)