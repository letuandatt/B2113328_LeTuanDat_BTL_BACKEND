const mongoose = require("mongoose");

const nhanVienSchema = new mongoose.Schema({
    hoten: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    matkhau: { type: String, required: true },
    chucvu: { type: String, required: true },
    diachi: { type: String, required: true },
    dienthoai: { type: String, required: true},
});

module.exports = mongoose.model("NhanVien", nhanVienSchema);