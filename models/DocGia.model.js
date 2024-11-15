const mongoose = require("mongoose");

const docGiaSchema = new mongoose.Schema({
    hoten: { type: String, required: true },
    email: { type: String, required: true, unique: true},
    matkhau: { type: String, required: true},
    phai: { type: String, required: true },
    diachi: { type: String, required: true },
    dienthoai: { type: String, required: true},
});

module.exports = mongoose.model("DocGia", docGiaSchema);