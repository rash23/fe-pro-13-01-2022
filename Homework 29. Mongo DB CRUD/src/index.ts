import * as express from "express";
import * as dotenv from "dotenv";

dotenv.config();

import { queryParser } from "express-query-parser";
import { connect } from "./infra/mongo";
import { AppointmentEntity } from "./infra/mongo/entities/appointment";
import { CLIOutput } from "./adapters/logger";
import { handleErrorMiddleware } from "./middlewares/error-handling";
import { AppointmentController } from "./app/appointment/controller";
import { MongoDBAppointmentRepository } from "./adapters/mongo/appointment-repository";

const { PORT } = process.env;

const bootstrap = async (app: express.Express) => {
	await connect(); // Connection to Mongo Cloud

	const nodeCliOutput = new CLIOutput();
	const appointmentRepository = new MongoDBAppointmentRepository(AppointmentEntity);

	app.use(express.json()); // Parse JSON body to object

	app.use(queryParser({
    parseNull: true,
    parseBoolean: true,
    parseNumber: true
  })); // Parse Query string to object with casted types

	app.use("/appointment", new AppointmentController(nodeCliOutput, appointmentRepository).process()); // Handle Request
	
	app.use(handleErrorMiddleware(nodeCliOutput)); // handle Error

	app.listen(PORT, () => {
		nodeCliOutput.print(`Server started successfully, and listening on port: ${PORT}`);
	});
};

bootstrap(express());