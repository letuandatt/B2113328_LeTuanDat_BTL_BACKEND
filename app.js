const express = require("express");
const cors = require("cors");

const app = express();
const ApiError = require("./app/api-error");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({message: "Welcome to Book Management System!"});
});

app.use((req, res, next) => {
    return next(new ApiError(404, "Resouce not found"));
});

app.use((req, res, next) => {
    return res.status(err.statusCode || 500).json({
        message: err.message || "Internal Server Error"
    });
});

module.exports = app;