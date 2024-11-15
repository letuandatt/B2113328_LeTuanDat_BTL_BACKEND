const mongoose = require("mongoose");

const theoDoiMuonSachSchema = new mongoose.Schema({
    docgia: { type: mongoose.Schema.Types.ObjectId, ref: "DocGia", required: true },
    sach: { type: mongoose.Schema.Types.ObjectId , ref: "Sach", required: true },
    ngaymuon: { type: Date, default: Date.now, required: true },
    ngaytra: { type: Date, required: false},
});

module.exports = mongoose.model("TheoDoiMuonSach", theoDoiMuonSachSchema);