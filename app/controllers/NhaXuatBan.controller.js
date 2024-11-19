const NhaXuatBan = require('../models/NhaXuatBan.model');
const ApiError = require('../api-error');

class NhaXuatBanController {
    static async getAll(req, res, next) {
        try {
            const publishers = await NhaXuatBan.find();
            return res.json(publishers);
        } catch (error) {
            return next(ApiError.internal(error.message));
        }
    }

    static async create(req, res, next) {
        try {
            const { ten, diachi } = req.body;

            if(![ten, diachi].every(Boolean)) {
                return next(ApiError.badRequest("Not enough information"));
            }

            const existNXB = await NhaXuatBan.findOne({ ten });
            if(existNXB) {
                return next(ApiError.badRequest("Existed publisher"));
            }

            const publisher = new NhaXuatBan({ ten, diachi });
            await publisher.save();
            return res.json("Create publisher successfully");
        } catch (error) {
            return next(ApiError.badRequest(error.message));
        }
    }

    static async getById(req, res, next) {
        try {
            const nhaXuatBan = await NhaXuatBan.findById(req.params.id);
            if (!nhaXuatBan) {
                return next(ApiError.notFound('Publisher not found'));
            }
            return res.json(nhaXuatBan);
        } catch (error) {
            return next(ApiError.internal(error.message));
        }
    }

    static async delete(req, res, next) {
        try {
            const result = await NhaXuatBan.findByIdAndDelete(req.params.id);
            if (!result) {
                return next(ApiError.notFound('Publisher not found'));
            }
            return res.json({ message: "Delete publisher successfully"});
        } catch (error) {
            return next(ApiError.internal(error.message));
        }
    }

    static async update(req, res, next) {
        try {
            const updates = req.body;
            const nhaXuatBan = await NhaXuatBan.findByIdAndUpdate(req.params.id, updates, { new: true });
            if (!nhaXuatBan) {
                return next(ApiError.notFound("Publisher not found"));
            }
            return res.json({ message: "Update publisher successfully" });
        } catch (error) {
            return next(ApiError.badRequest(error.message));
        }
    }
}

module.exports = NhaXuatBanController;