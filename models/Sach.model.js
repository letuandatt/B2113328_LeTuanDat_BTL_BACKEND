const mongoose = require("mongoose");

const sachSchema = new mongoose.Schema({
    ten: { type: String, required: true },
    tacgia: { type: String, required: true },
    dongia: { type: Number, required: true },
    soquyen: { type: Number, required: true },
    namxuatban: { type: Number, required: true },
    nhaxuatban: { type: mongoose.Schema.Types.ObjectId, ref: "NhaXuatBan", required: true},
});

module.exports = mongoose.model("Sach", sachSchema);