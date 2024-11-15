const DocGia = require('../models/DocGia.model');
const ApiError = require('../api-error');
const bcrypt = require("bcrypt");

class DocGiaController {
    static async getAll(req, res, next) {
        try {
            const readers = await DocGia.find();
            return res.json(readers);
        } catch (error) {
            return next(ApiError.internal(error.message));
        }
    }

    static async getById(req, res, next) {
        try {
            const reader = await DocGia.findById(req.params.id);
            if (!reader) {
                return next(ApiError.notFound('Reader not found'));
            }
            return res.json(reader);
        } catch (error) {
            return next(ApiError.internal(error.message));
        }
    }

    static async create(req, res, next) {
        try {
            const { hoten, email, matkhau, phai, diachi, dienthoai } = req.body;
            if(![hoten, email, matkhau, phai, diachi, dienthoai].every(Boolean)) {
                return next(ApiError.badRequest("Not enough information"));
            }
            
            const existDocGia = await DocGia.exists({ email });
            if (existDocGia) {
                return next(ApiError.badRequest("This email address has been used"));
            }

            const hashPassword = await bcrypt.hash(matkhau, 10);

            const reader = new DocGia({
                hoten,
                email,
                matkhau: hashPassword,
                phai,
                diachi,
                dienthoai
            });
            await reader.save();
            return res.json({ message: "Create reader successfully"});
        } catch (error) {
            return next(ApiError.badRequest(error.message));
        }
    }

    static async delete(req, res, next) {
        try {
            const result = await DocGia.findByIdAndDelete(req.params.id);
            if (!result) {
                return next(ApiError.notFound('Reader not found'));
            }
            return res.json({ message: "Delete reader successfully" });
        } catch (error) {
            return next(ApiError.internal(error.message));
        }
    }

    static async update(req, res, next) {
        try {
            const updates = req.body;
            const docGia = await DocGia.findByIdAndUpdate(req.params.id, updates, { new: true });
            if (!docGia) {
                return next(ApiError.notFound("Reader not found"));
            }
            return res.json({ message: "Update reader successfully"});
        } catch (error) {
            return next(ApiError.badRequest(error.message));
        }
    }
}

module.exports = DocGiaController;
