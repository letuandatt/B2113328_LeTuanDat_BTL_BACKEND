const ApiError = require('../api-error.js');
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const DocGia = require("../models/DocGia.model");
const NhanVien = require("../models/NhanVien.model");
const redis = require("redis");
const client = redis.createClient(); // Tạo kết nối Redis tại đây

require("dotenv").config();

client.on("connect", function() {
    console.log("Redis client connected");
});

client.on("error", function (err) {
    console.error("Error connecting to Redis", err);
});

exports.login = async (req, res, next) => {
    try {
        if (!req.body?.email || !req.body?.matkhau){
            return next(ApiError.badRequest("Not enough information"));
        }
        const { email, matkhau, role } = req.body;

        let user;
        if (role === 'nhanvien') {
            user = await NhanVien.findOne({ email });
        } else if (role === 'docgia') {
            user = await DocGia.findOne({ email });
        }

        if (!user || !(await bcrypt.compare(matkhau, user.matkhau))) {
            return next(ApiError.unauthorized('Invalid email or password'));
        }

        const userRole = role || (email.includes('@nhanvien.com') ? 'nhanvien' : 'docgia');

        const token = jwt.sign({
            id: user._id,
            role: userRole
        }, process.env.JWT_SECRET, { expiresIn: '24h' });

        return res.json({ message: 'Login successful', token, user });
    } catch (error) {
        next(ApiError.internal(error.message));
    }
};

exports.register = async (req, res, next) => {
    try {
        const { hoten, email, matkhau, phai, diachi, dienthoai } = req.body;

        if (![hoten, email, matkhau, phai, diachi, dienthoai].every(Boolean)) {
            return next(ApiError.badRequest("Not enough information"));
        }

        const existDocGia = await DocGia.exists({ email });
        if (existDocGia) {
            return next(ApiError.badRequest("Email address has been used"));
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return next(ApiError.badRequest("Invalid email format"));
        }

        const hashPassword = await bcrypt.hash(matkhau, 10);
        const newDocGia = new DocGia({
            hoten,
            email,
            matkhau: hashPassword,
            phai,
            diachi,
            dienthoai
        });
        await newDocGia.save();

        return res.status(201).json({ message: 'Registration successful' });
    } catch (error) {
        next(ApiError.badRequest(error.message));
    }
};
