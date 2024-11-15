const TheoDoiMuonSach = require('../models/TheoDoiMuonSach.model');
const ApiError = require('../api-error');
const DocGia = require("../models/DocGia.model");
const Sach = require("../models/Sach.model");
const mongoose  = require('mongoose');

const isValidObjectID = (id) => mongoose.Types.ObjectId.isValid(id);

async function getTDMSWithFilter(req, res, next, filter = {}, option = {}) {
    try {
        const tdms = await TheoDoiMuonSach.find(filter)
                                            .populate('docgia', 'ten')
                                            .populate('sach', 'ten')
                                            .sort(option.sort || { ngaymuon: -1 });
        return res.json(tdms);
    } catch (error) {
        return next(ApiError.internal(error.message));
    }
}

class TheoDoiMuonSachController {
    validateDocGiaAndSach = async (docGiaId, sachId) => {
        const [docgia, sach] = Promise.all([
            DocGia.findById(docgiaId),
            Sach.findById(sachId),
        ]);
        if (!docgia) {
            return ApiError.notFound("Reader not found");
        }
        if (!sach) {
            return ApiError.notFound("Book not found");
        }
    }

    static async muonSach(req, res, next) {
        try {
            const { docgiaId, sachId } = req.body;
            if (!isValidObjectID(docgiaId) || !isValidObjectID(sachId)) {
                return next(ApiError.badRequest("ID invalid"));
            }
            await validateDocGiaAndSach(docgiaId, sachId);
            const muonSach = await TheoDoiMuonSach.create({
                docgia: docgiaId,
                sach: sachId,
            })
            return res.json(muonSach);
        } catch (error) {
            return next(ApiError.badRequest(error.message));
        }
    }

    static async traSach(req, res, next) {
        try {
            if (!isValidObjectID(req.params.id)){
                return next(ApiError.badRequest("ID invalid"));
            }
            const traSach = await TheoDoiMuonSach.findByIdAndUpdate(
                req.params.id,
                { ngaytra: new Date() },
                { new: true },
            );
            if (!traSach) {
                return next(ApiError.notFound("Can't find this book borrowing slot"))
            }
            return res.json(traSach);
        } catch (error) {
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
}

module.exports = TheoDoiMuonSachController;
