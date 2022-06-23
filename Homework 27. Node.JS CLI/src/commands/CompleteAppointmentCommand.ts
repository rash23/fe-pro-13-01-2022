import { Appointment } from '../domain/appointment';
import { NotFoundError } from '../domain/error';
import { AppointmentRepository } from '../ports/repositories/appointment';
import { Logger } from '../ports/logger';
import { CLIOutput } from '../adapters/logger';

type CompleteAppointmentCommandParams = {
	id: string;
};

export class CompleteAppointmentCommand {
	cliOutput: Logger;
	constructor(private readonly appointmentRepository: AppointmentRepository) {
		this.cliOutput = new CLIOutput();
	}

	async execute({ id }: CompleteAppointmentCommandParams): Promise<Appointment> {
		const appointment = await this.appointmentRepository.findOne(id);

		if (!appointment) {
			throw new NotFoundError();
		}

		const modelOfAppointment = Appointment.toModel(appointment);

		modelOfAppointment.update({ completed: true });
		modelOfAppointment.update({ updated_at: new Date().toISOString() });

		return await this.appointmentRepository.save(modelOfAppointment);
	}
}
