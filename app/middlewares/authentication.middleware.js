const jwt = require("jsonwebtoken");
const ApiError = require("../api-error");
const redis = require("redis");

const client = redis.createClient();

client.on('error', (err) => {
    console.error(`Redis error: ${err}`);
})

exports.checkRole = (roles) => {
    return (req, res, next) => {
        const token = req.headers.authorization?.split(' ')[1];
        if(!token) {
            return next(new ApiError(401, "Unauthorized"));
        }

        client.get(token, (err, data) => {
            if (err) {
                console.error(`Redis error: ${err}`);
                return next(new ApiError(500, "Lỗi hệ thống khi kiểm tra token"));
            }

            if (data === "blacklisted") {
                return next(new ApiError(401, "Token đã hết hạn hoặc không hợp lệ"));
            }

            try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
                req.user = decoded;

                if (!roles.includes(req.user.role)) {
                    return res.status(403).json({ message: 'Bạn không có quyền truy cập' });
                }

                next();
            } catch (error) {
                return next(new ApiError(401, `Token không hợp lệ: ${error.message}`));
            }
        })
    }
}