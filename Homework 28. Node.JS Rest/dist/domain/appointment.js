"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Appointment = void 0;
class Appointment {
    constructor(record) {
        this.record = record;
    }
    get id() {
        return this.record.id;
    }
    get completed() {
        return this.record.completed;
    }
    get created_at() {
        return this.record.created_at;
    }
    get updated_at() {
        return this.record.updated_at;
    }
    static toRecord(appointment) {
        return appointment.record;
    }
    static create() {
        const now = new Date();
        return new Appointment({
            id: Appointment.generateId(now),
            completed: false,
            created_at: now.toISOString(),
        });
    }
    static generateId(now) {
        return `AP-${now.getHours()}/${now.getMinutes()}/${now.getSeconds()}/${now.getMilliseconds()}`;
    }
}
exports.Appointment = Appointment;
//# sourceMappingURL=appointment.js.map