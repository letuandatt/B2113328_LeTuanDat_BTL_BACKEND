const NhanVien = require('../models/NhanVien.model');
const ApiError = require('../api-error');
const bcrypt = require("bcrypt");

class NhanVienController {
    static async getAll(req, res, next) {
        try {
            const staff = await NhanVien.find();
            return res.json(staff);
        } catch (error) {
            return next(ApiError.internal(error.message));
        }
    }

    static async create(req, res, next) {
        try {
            const { hoten, email, matkhau, chucvu, diachi, dienthoai } = req.body;
            if(![ hoten, email, matkhau, chucvu, diachi, dienthoai ].every(Boolean)) {
                return next(ApiError.badRequest("Not enough information"));
            }
            const hashPassword = await bcrypt.hash(matkhau, 12);
            const staff = new NhanVien({
                hoten,
                email,
                matkhau: hashPassword,
                chucvu,
                diachi,
                dienthoai,
            });
            await staff.save();
            return res.json({ message: "Create employee succesfully" });
        } catch (error) {
            return next(ApiError.badRequest(error.message));
        }
    }

    static async getById(req, res, next) {
        try {
            const staff = await NhanVien.findById(req.params.id);
            if (!staff) {
                return next(ApiError.notFound("Employee not found"));
            }
            return res.json(staff);
        } catch (error) {
            return next(ApiError.internal(error.message));
        }
    }

    static async update(req, res, next) {
        try {
            const staff = new NhanVien(req.body);
            await staff.save();
            return res.json({ message: "Update employee successfully"});
        } catch (error) {
            return next(ApiError.badRequest(error.message));
        }
    }

    static async delete(req, res, next) {
        try {
            const staff = await NhanVien.findByIdAndDelete(req.params.id);
            if (!staff) {
                return next(ApiError.notFound("Employee not found"));
            }
            return res.json({ message: "Delete employee successfully"});
        } catch (error) {
            return next(ApiError.internal(error.message));
        }
    }
}

module.exports = NhanVienController;
