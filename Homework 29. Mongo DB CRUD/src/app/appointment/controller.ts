import { Request, Response, Router } from 'express';

import { Appointment, AppointmentRecord } from '../../domain/appointment';
import { Logger } from '../../ports/logger';

import { CreateAppointmentCommand } from '../../commands/CreateAppointmentCommand';
import { GetAppointmentCommand } from '../../commands/GetAppointmentCommand';
import { ExpressSuccessResponse, route } from '../../infra/express';
import { AppointmentRepository } from '../../ports/repositories/appointment';
import { ListAppointmentCommand } from '../../commands/ListAppointmentsCommand';
import { PickAppointmentCommand } from '../../commands/PickAppointmentCommand';
import { DeleteAppointmentCommand } from '../../commands/DeleteAppointmentCommand';
import { CompleteAppointmentCommand } from '../../commands/CompleteAppointmentCommand';

import {
	CreateBody,
	createBodySchema,
	GetParams,
	ListQuery,
	PickBody,
	PickParams,
	DeleteParams,
	CompleteParams,
} from './definition';

export class AppointmentController {
	router: Router;

	constructor(private readonly nodeCliOutput: Logger, private readonly appointmentRepository: AppointmentRepository) {
		this.router = Router({ mergeParams: true });

		this.router.post('/', route(this.handleCreate, createBodySchema));
		this.router.post('/:id/pick', route(this.handlePick));
		this.router.get('/:id', route(this.handleGet));
		this.router.get('/', route(this.handleList));
		this.router.delete('/:id', route(this.handleDelete));
		this.router.post('/:id/complete', route(this.handleComplete as any));
	}

	process() {
		return this.router;
	}

	handleCreate = async (
		req: Request<unknown, ExpressSuccessResponse<AppointmentRecord>, CreateBody>,
		res: Response
	): Promise<AppointmentRecord> => {
		const { fullName, email } = req.body;

		const appointment = await new CreateAppointmentCommand(this.appointmentRepository).execute({
			assignee: {
				fullName,
				email,
			},
		});

		const record = Appointment.toRecord(appointment);

		this.nodeCliOutput.print(`[${record.id}] has been created`);

		res.status(201);

		return Appointment.toRecord(appointment);
	};

	handleGet = async (
		req: Request<GetParams, ExpressSuccessResponse<AppointmentRecord>>
	): Promise<AppointmentRecord> => {
		const { id } = req.params;

		const appointment = await new GetAppointmentCommand(this.appointmentRepository).execute({
			id,
		});

		const record = Appointment.toRecord(appointment);

		this.nodeCliOutput.print(`[${record.id}] has been found`);

		return Appointment.toRecord(appointment);
	};

	handleList = async (
		req: Request<unknown, ExpressSuccessResponse<AppointmentRecord[]>, unknown, ListQuery>
	): Promise<AppointmentRecord[]> => {
		const { completed, limit } = req.query;

		const appointments = await new ListAppointmentCommand(this.appointmentRepository).execute({ completed, limit });

		this.nodeCliOutput.print(`[${appointments.length} records] has been found`);

		return appointments.map(Appointment.toRecord);
	};

	handlePick = async (req: Request<PickParams, unknown, PickBody>): Promise<void> => {
		const { id } = req.params;
		const { fullName, email } = req.body;

		await new PickAppointmentCommand(this.appointmentRepository).execute({
			id,
			operator: {
				fullName,
				email,
			},
		});

		this.nodeCliOutput.print(`[${id} record] has been picked`);
	};

	handleDelete = async (req: Request<DeleteParams>, res: Response): Promise<Appointment> => {
		const { id } = req.params;
		const appointment = await new DeleteAppointmentCommand(this.appointmentRepository).execute({
			id,
		});

		const record = Appointment.toRecord(appointment);

		await this.appointmentRepository.remove(record.id);
		console.log(record);

		this.nodeCliOutput.print(`[${record.id}] has been deleted`);

		res.status(204);

		return appointment;
	};

	handleComplete = async (req: Request<CompleteParams>): Promise<void> => {
		const { id } = req.params;

		await new CompleteAppointmentCommand(this.appointmentRepository).execute({
			id,
			completed: true,
		});

		this.nodeCliOutput.print(`[${id}] has been completed`);
	};
}
