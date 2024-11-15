const mongoose = require("mongoose");

const nhaXuatBanSchema = new mongoose.Schema({
    ten: { type: String, required: true },
    diachi: { type: String, required: true, },
});

module.exports = mongoose.model("NhaXuatBan", nhaXuatBanSchema);