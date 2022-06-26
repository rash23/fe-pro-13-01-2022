import { Appointment } from '../../domain/appointment';
import { Logger } from '../../ports/logger';

import { CreateAppointmentCommand } from '../../commands/CreateAppointmentCommand';
import { GetAppointmentCommand } from '../../commands/GetAppointmentCommand';
import { Request, Response, Router } from 'express';
import { route } from '../../infra/express';
import { AppointmentRepository } from '../../ports/repositories/appointment';
import { GetParams, ListQuery } from './definition';
import { ListAppointmentCommand } from '../../commands/ListAppointmentsCommand';
import { DeleteAppointmentCommand } from '../../commands/DeleteAppointmentCommand';
import { UpdateAppointmentCommand } from '../../commands/UpdateAppointmentCommand';

export class AppointmentController {
	router: Router;

	constructor(private readonly nodeCliOutput: Logger, private readonly appointmentRepository: AppointmentRepository) {
		this.router = Router({ mergeParams: true });

		this.router.post('/', route(this.handleCreate));
		this.router.get('/:id', route(this.handleGet));
		this.router.get('/', route(this.handleList));
		this.router.delete('/:id', route(this.handleDelete));
		this.router.put('/:id', route(this.handleUpdate));
	}

	process() {
		return this.router;
	}

	handleCreate = async (_req: Request, res: Response): Promise<Appointment> => {
		const appointment = await new CreateAppointmentCommand(this.appointmentRepository).execute();

		const record = Appointment.toRecord(appointment);

		this.nodeCliOutput.print(`[${record.id}] has been created`);

		res.status(201);

		return appointment;
	};

	handleGet = async (req: Request<GetParams>): Promise<Appointment> => {
		const { id } = req.params;

		const appointment = await new GetAppointmentCommand(this.appointmentRepository).execute({
			id,
		});

		const record = Appointment.toRecord(appointment);

		this.nodeCliOutput.print(`[${record.id}] has been found`);

		return appointment;
	};

	handleList = async (req: Request<unknown, unknown, unknown, ListQuery>): Promise<Appointment[]> => {
		const { completed, limit } = req.query;

		const appointments = await new ListAppointmentCommand(this.appointmentRepository).execute({ completed, limit });

		this.nodeCliOutput.print(`[${appointments.length} records] has been found`);

		return appointments;
	};

	handleDelete = async (req: Request, res: Response): Promise<Appointment> => {
		const { id } = req.params;
		const appointment = await new DeleteAppointmentCommand(this.appointmentRepository).execute({
			id,
		});

		const record = Appointment.toRecord(appointment);
		console.log(record);
		this.nodeCliOutput.print(`[${record.id}] has been deleted `);

		res.status(204);

		return appointment;
	};

	handleUpdate = async (req: Request): Promise<Appointment> => {
		const { id } = req.params;

		const appointment = await new UpdateAppointmentCommand(this.appointmentRepository).execute({
			id,
		});

		const record = Appointment.toRecord(appointment);

		this.nodeCliOutput.print(`[${record.id}] has been completed [${record.completed}] `);

		return appointment;
	};
}