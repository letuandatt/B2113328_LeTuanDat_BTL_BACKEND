const express = require("express");
const cors = require("cors");
const ApiError = require("./api-error");
const rAuth = require("./routes/Auth.route");
const rDocGia = require("./routes/DocGia.route");
const rNhanVien = require("./routes/NhanVien.route");
const rNhaXuatBan = require("./routes/NhaXuatBan.route");
const rSach = require("./routes/Sach.route");
const rTheoDoiMuonSach = require("./routes/TheoDoiMuonSach.route");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', rAuth);
app.use("/api/docgia", rDocGia);
app.use("/api/nhanvien", rNhanVien);
app.use("/api/nhaxuatban", rNhaXuatBan);
app.use("/api/sach", rSach);
app.use("/api/theodoimuonsach", rTheoDoiMuonSach);

app.get("/", (req, res) => {
    res.json({ message: "Welcome to Library Management System!" });
});

app.use((req, res, next) => {
    return next(ApiError.notFound("Resource not found"));
});

app.use((err, req, res, next) => {
    return res.status(err.statusCode).json({ message: err.message }) || next(ApiError.internal("Internal Server Error"));
});

module.exports = app;