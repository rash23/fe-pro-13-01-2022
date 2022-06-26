import { Appointment } from '../domain/appointment';
import { NotFoundError } from '../domain/error';
import { AppointmentRepository } from '../ports/repositories/appointment';
import { Logger } from '../ports/logger';
import { CLIOutput } from '../adapters/logger';

type UpdateAppointmentCommandParams = {
	id: string;
};

export class UpdateAppointmentCommand {
	cliOutput: Logger;
	constructor(private readonly appointmentRepository: AppointmentRepository) {
		this.cliOutput = new CLIOutput();
	}

	async execute({ id }: UpdateAppointmentCommandParams): Promise<Appointment> {
		const appointment = await this.appointmentRepository.findOne(id);

		if (!appointment) {
			throw new NotFoundError();
		}

		const modelOfAppointment = Appointment.toModel(appointment);

		modelOfAppointment.update({ completed: true });

		return await this.appointmentRepository.save(modelOfAppointment);
	}
}
