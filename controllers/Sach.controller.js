const Sach = require('../models/Sach.model');
const NhaXuatBan = require("../models/NhaXuatBan.model");
const ApiError = require('../api-error');
const fs = require("fs");
const path = require("path");

class SachController {
    static async getAll(req, res, next) {
        try {
            const books = await Sach.find().populate('nhaxuatban', 'ten');
            return res.json(books);
        } catch (error) {
            return next(ApiError.internal(error.message));
        }
    }

    static async create(req, res, next) {
        try {
            const { ten, tacgia, dongia, soquyen, namxuatban, nxbid } = req.body;
            if(![ ten, tacgia, dongia, soquyen, namxuatban, nxbid ].every(Boolean)) {
                return next(ApiError.badRequest("Not enough information"));
            }
            
            const existNhaXuatBan = await NhaXuatBan.exists({ _id: nxbid });
            if(!existNhaXuatBan) {
                return next(ApiError.notFound("Publisher not found"));
            }

            const book = new Sach({
                ten, tacgia, dongia, soquyen, namxuatban, nhaxuatban: nxbid
            });
            await book.save();
            return res.json("Create book succesfully");
        } catch (error) {
            return next(ApiError.badRequest(error.message));
        }
    }

    static async getById(req, res, next) {
        try {
            const book = await Sach.findById(req.params.id).populate('nhaxuatban', 'ten');
            if (!book) {
                return next(ApiError.notFound("Book not found"));
            }
            return res.json(book);
        } catch (error) {
            return next(ApiError.internal(error.message));
        }
    }

    static async update(req, res, next) {
        try {
            const updates = req.body;
            const book = await Sach.findByIdAndUpdate(req.params.id, updates, { new: true });
            if (!book) {
                return next(ApiError.notFound("Book not found"));
            }
            return res.json(book);
        } catch (error) {
            return next(ApiError.internal(error.message));
        }
    }

    static async delete(req, res, next) {
        try {
            const book = await Sach.findByIdAndDelete(req.params.id);
            if (!book) {
                return next(ApiError.notFound("Book not found"));
            }
            return res.json({ message: "Delete book successfully" });
        } catch (error) {
            return next(ApiError.internal(error.message));
        }
    }
}

module.exports = SachController;
