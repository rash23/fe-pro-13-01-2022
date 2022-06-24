"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundError = exports.DomainError = void 0;
class DomainError extends Error {
    constructor() {
        super(...arguments);
        this.name = "DomainError";
    }
}
exports.DomainError = DomainError;
class NotFoundError extends DomainError {
    constructor() {
        super("Not Found");
    }
}
exports.NotFoundError = NotFoundError;
//# sourceMappingURL=error.js.map