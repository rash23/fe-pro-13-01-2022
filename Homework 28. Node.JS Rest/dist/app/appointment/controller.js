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
exports.AppointmentController = void 0;
const appointment_1 = require("../../domain/appointment");
const CreateAppointmentCommand_1 = require("../../commands/CreateAppointmentCommand");
const GetAppointmentCommand_1 = require("../../commands/GetAppointmentCommand");
const express_1 = require("express");
const express_2 = require("../../infra/express");
const ListAppointmentsCommand_1 = require("../../commands/ListAppointmentsCommand");
// post "/appointment"
// get "/appointment/45234623476236471276376123"
// put "/appointment/45234623476236471276376123" - {}
// delete "/appointment/45234623476236471276376123"
// get "/appointment"
class AppointmentController {
    constructor(nodeCliOutput, appointmentRepository) {
        this.nodeCliOutput = nodeCliOutput;
        this.appointmentRepository = appointmentRepository;
        this.handleCreate = (_req, res) => __awaiter(this, void 0, void 0, function* () {
            const appointment = yield new CreateAppointmentCommand_1.CreateAppointmentCommand(this.appointmentRepository).execute();
            const record = appointment_1.Appointment.toRecord(appointment);
            this.nodeCliOutput.print(`[${record.id}] has been created`);
            res.status(201);
            return appointment;
        });
        this.handleGet = (req) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const appointment = yield new GetAppointmentCommand_1.GetAppointmentCommand(this.appointmentRepository).execute({
                id,
            });
            const record = appointment_1.Appointment.toRecord(appointment);
            this.nodeCliOutput.print(`[${record.id}] has been found`);
            return appointment;
        });
        this.handleList = (req) => __awaiter(this, void 0, void 0, function* () {
            const { completed, limit } = req.query;
            const appointments = yield new ListAppointmentsCommand_1.ListAppointmentCommand(this.appointmentRepository).execute({ completed, limit });
            this.nodeCliOutput.print(`[${appointments.length} records] has been found`);
            return appointments;
        });
        this.router = (0, express_1.Router)({ mergeParams: true });
        this.router.post("/", (0, express_2.route)(this.handleCreate));
        this.router.get("/:id", (0, express_2.route)(this.handleGet));
        this.router.get("/", (0, express_2.route)(this.handleList));
    }
    process() {
        return this.router;
    }
}
exports.AppointmentController = AppointmentController;
//# sourceMappingURL=controller.js.map