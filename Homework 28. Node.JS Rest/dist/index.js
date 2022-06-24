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
const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const express_query_parser_1 = require("express-query-parser");
const logger_1 = require("./adapters/logger");
const error_handling_1 = require("./middlewares/error-handling");
const controller_1 = require("./app/appointment/controller");
const appointment_1 = require("./adapters/cache/appointment");
const { PORT } = process.env;
const bootstrap = (app) => __awaiter(void 0, void 0, void 0, function* () {
    const nodeCliOutput = new logger_1.CLIOutput();
    const appointmentRepository = new appointment_1.InMemoryAppointmentRepository();
    app.use(express.json()); // Parse JSON body to object
    app.use((0, express_query_parser_1.queryParser)({
        parseNull: true,
        parseBoolean: true,
        parseNumber: true,
    })); // Parse Query string to object with casted types
    app.use('/appointment', new controller_1.AppointmentController(nodeCliOutput, appointmentRepository).process()); // Handle Request
    app.use((0, error_handling_1.handleErrorMiddleware)(nodeCliOutput)); // handle Error
    app.listen(PORT, () => {
        nodeCliOutput.print(`Server started successfully, and listening on port: ${PORT}`);
    });
});
bootstrap(express());
//# sourceMappingURL=index.js.map