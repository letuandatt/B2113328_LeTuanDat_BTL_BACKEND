const TheoDoiMuonSach = require('../models/TheoDoiMuonSach.model');
const ApiError = require('../api-error');
const DocGia = require("../models/DocGia.model");
const Sach = require("../models/Sach.model");
const mongoose  = require('mongoose');

const isValidObjectID = (id) => mongoose.Types.ObjectId.isValid(id);

async function getTDMSWithFilter(req, res, next, filter = {}, option = {}) {
    try {
        const tdms = await TheoDoiMuonSach.find(filter)
                                            .populate('docgia', 'hoten')
                                            .populate('sach', 'ten')
                                            .sort(option.sort || { ngaymuon: -1 });
        return res.json(tdms);
    } catch (error) {
        return next(ApiError.internal(error.message));
    }
}

class TheoDoiMuonSachController {
    static async validateDocGiaAndSach(docgiaId, sachId) {
        const [docgia, sach] = await Promise.all([
            DocGia.findById(docgiaId),
            Sach.findById(sachId),
        ]);
        if (!docgia) {
            return ApiError.notFound("Reader not found");
        }
        if (!sach) {
            return ApiError.notFound("Book not found");
        }
        return docgia, sach;
    };

    static async muonSach(req, res, next) {
        try {
            const { docgiaId, sachId } = req.body;
            if (!isValidObjectID(docgiaId) || !isValidObjectID(sachId)) {
                return next(ApiError.badRequest("ID invalid"));
            }
            
            const sach = await Sach.findById(sachId);
            const daMuon = await TheoDoiMuonSach.countDocuments({ sach: sachId, ngaytra: { $exists: false }});

            if (sach.soquyen <= daMuon) {
                return next(ApiError.badRequest("Sách đã hết, không thể mượn thêm"));
            }

            await TheoDoiMuonSachController.validateDocGiaAndSach(docgiaId, sachId);
            const muonSach = await TheoDoiMuonSach.create({
                docgia: docgiaId,
                sach: sachId,
            });

            return res.json(muonSach);
        } catch (error) {
            return next(ApiError.badRequest(error.message));
        }
    }

    static async traSach(req, res, next) {
        try {
            const id = req.params.id;
            
            if (!isValidObjectID(id)) {
                return next(ApiError.badRequest("ID không hợp lệ"));
            }

            const traSach = await TheoDoiMuonSach.findById(id);
            if (!traSach) {
                return next(ApiError.notFound("Không tìm thấy bản ghi mượn sách"));
            }

            traSach.ngaytra = new Date();
            await traSach.save();

            return res.json(traSach);
        } catch (error) {
            console.log(error.message);
            return next(ApiError.internal(error.message));
        }
    }


    static getAllTDMS(req, res, next) {
        return getTDMSWithFilter(req, res, next, {}, {});
    }

    static getAllTDMSBySach(req, res, next) {
        return getTDMSWithFilter(req, res, next, { sach: req.params.id }, {});
    }

    static getAllTDMSByDocGia(req, res, next) {
        return getTDMSWithFilter(req, res, next, { docgia: req.params.id }, {});
    }

    static async checkSachAvailable(req, res, next) {
        try {
            if (!isValidObjectID(req.params.id)) {
                return next(ApiError.badRequest("ID invalid"));
            }
            const [daMuon, sach] = await Promise.all([
                TheoDoiMuonSach.countDocuments({ sach: req.params.id, ngaytra: { $exists: false }}),
                Sach.findById(req.params.id)
            ])
            if (!sach) {
                return next(ApiError.notFound("Book not found"));
            }
            const sachConlai = sach.soquyen - daMuon;
            return res.json({ available: sachConlai > 0, sachConlai});
        } catch (error) {
            return next(ApiError.internal(error.message));
        }
    }

    static async delete(req, res, next) {
        try {
            const tdms = await TheoDoiMuonSach.findByIdAndDelete(req.params.id);
            if (!tdms) {
                return next(ApiError.notFound("This borrowing slot not found"));
            }
            return res.json({ message: "Delete successfully" });
        } catch (error) {
            return next(ApiError.internal(error.message));
        }
    }
}

module.exports = TheoDoiMuonSachController;
