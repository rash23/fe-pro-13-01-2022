"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryAppointmentRepository = void 0;
const lodash_1 = require("lodash");
const error_1 = require("../../domain/error");
class InMemoryAppointmentRepository {
    constructor() {
        this.store = new Map();
    }
    save(appointment) {
        return __awaiter(this, void 0, void 0, function* () {
            this.store.set(appointment.id, appointment);
            return appointment;
        });
    }
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const appointment = this.store.get(id);
            if (!appointment) {
                return undefined;
            }
            return appointment;
        });
    }
    findMany({ completed, limit }) {
        return __awaiter(this, void 0, void 0, function* () {
            let appointments = Array.from(this.store.values());
            if (!(0, lodash_1.isUndefined)(completed)) {
                appointments = appointments.filter(record => record.completed === completed);
            }
            if (!(0, lodash_1.isUndefined)(limit) && isFinite(limit)) {
                appointments = appointments.slice(0, limit);
            }
            return appointments;
        });
    }
    update(appointment) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.store.has(appointment.id)) {
                throw new error_1.NotFoundError();
            }
            this.store.set(appointment.id, appointment);
            return appointment;
        });
    }
    remove(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.store.has(id)) {
                throw new error_1.NotFoundError();
            }
            this.store.delete(id);
        });
    }
}
exports.InMemoryAppointmentRepository = InMemoryAppointmentRepository;
//# sourceMappingURL=appointment.js.map