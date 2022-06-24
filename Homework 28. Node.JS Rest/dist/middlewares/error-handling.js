"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleErrorMiddleware = void 0;
const error_1 = require("../domain/error");
const handleErrorMiddleware = (logger) => {
    return (err, _req, res, next) => {
        if (err instanceof error_1.DomainError) {
            res.status(err instanceof error_1.NotFoundError ? 404 : 400);
        }
        else {
            res.status(500);
        }
        logger.alert(err.message, err.name);
        res.json({
            status: res.statusCode,
            message: err.message
        });
        next();
    };
};
exports.handleErrorMiddleware = handleErrorMiddleware;
//# sourceMappingURL=error-handling.js.map