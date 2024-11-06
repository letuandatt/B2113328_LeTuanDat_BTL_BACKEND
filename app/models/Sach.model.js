const mongoose = require("mongoose");

const sachSchema = new mongoose.Schema({
    ten: { type: String, required: true },
    tacgia: { type: String, required: true },
    dongia: { type: Number, required: true },
    soquyen: { type: Number, required: true },
    namxuatban: { type: Number, required: true },
    hinhanh: { type: String, required: true },
    namxuatban: { type: mongoose.Schema.Types.ObjectId, ref: "NhaXuanBan", required: true},
});

module.exports = mongoose.model("Sach", sachSchema);