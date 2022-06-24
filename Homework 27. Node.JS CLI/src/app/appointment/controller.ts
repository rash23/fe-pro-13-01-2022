import { Appointment } from '../../domain/appointment';
import { CLI, CLICommand } from '../../ports/cli';
import { Logger } from '../../ports/logger';
import { CreateAppointmentCommand } from '../../commands/CreateAppointmentCommand';
import { GetAppointmentCommand } from '../../commands/GetAppointmentCommand';
import { AppointmentRepository, FindManyFilter } from '../../ports/repositories/appointment';
import { CompleteAppointmentCommand } from '../../commands/CompleteAppointmentCommand';
import { DeleteAppointmentCommand } from '../../commands/DeleteAppointmentCommand';
import { ListAppointmentCommand } from '../../commands/ListAppointmentCommand';
import { ClearAppointmentCommand } from '../../commands/ClearAppointmentsCommand';

// FindManyFilter

export class AppointmentController {
	constructor(
		private readonly nodeCliOutput: Logger,
		private readonly nodeCli: CLI,
		private readonly appointmentRepository: AppointmentRepository
	) {}

	async process() {
		const command = this.nodeCli.getCommand();

		if (command === CLICommand.CREATE) {
			const appointment = await new CreateAppointmentCommand(this.appointmentRepository).execute();

			const record = Appointment.toRecord(appointment);

			this.nodeCliOutput.print(`[${record.id}] has been created`);
		}

		if (command === CLICommand.GET) {
			const { id } = this.nodeCli.getQuery();

			const appointment = await new GetAppointmentCommand(this.appointmentRepository).execute({
				id,
			});

			const record = Appointment.toRecord(appointment);

			this.nodeCliOutput.print(`[${record.id}] has been found`);
		}

		if (command === CLICommand.COMPLETE) {
			const { id } = this.nodeCli.getQuery();

			const appointment = await new CompleteAppointmentCommand(this.appointmentRepository).execute({
				id,
			});

			const record = Appointment.toRecord(appointment);

			this.nodeCliOutput.print(`[${record.id}] has been completed [${record.completed}] `);
		}

		if (command === CLICommand.DELETE) {
			const { id } = this.nodeCli.getQuery();

			const appointment = await new DeleteAppointmentCommand(this.appointmentRepository).execute({
				id,
			});

			const record = Appointment.toRecord(appointment);

			this.nodeCliOutput.print(`[${record.id}] has been deleted `);
		}

		if (command === CLICommand.LIST) {
			const filter = this.nodeCli.getQuery<FindManyFilter>();

			const appointmentsList = await new ListAppointmentCommand(this.appointmentRepository).execute(filter);
			console.log(filter.status);
			console.log(filter.limit);
			console.log(appointmentsList);

			for (const appointment of appointmentsList) {
				this.nodeCliOutput.print(`[${Appointment.toRecord(appointment).id}] has been read`);
			}
		}

		if (command === CLICommand.CLEAR) {
			await new ClearAppointmentCommand(this.appointmentRepository).execute({});

			this.nodeCliOutput.print('Storage has been cleaned');
		}
	}
}
