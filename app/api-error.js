class ApiError extends Error {
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor);
    }

    static badRequest(message) {
        return new ApiError(400, message);
    }

    static unauthorized(message) {
        return new ApiError(401, message);
    }

    static notFound(message) {
        return new ApiError(404, message);
    }

    static internal(message) {
        return new ApiError(500, message);
    }
}

module.exports = ApiError;