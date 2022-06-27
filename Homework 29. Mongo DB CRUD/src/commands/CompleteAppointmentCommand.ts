// import { AppointmentOperator } from '../domain/appointment';
import { NotFoundError } from '../domain/error';
import { AppointmentRepository } from '../ports/repositories/appointment';

type CompleteAppointmentCommandParams = {
	id: string;
	completed: boolean;
};

export class CompleteAppointmentCommand {
	constructor(private readonly appointmentRepository: AppointmentRepository) {}

	async execute({ id, completed }: CompleteAppointmentCommandParams): Promise<void> {
		const appointment = await this.appointmentRepository.findOne(id);

		if (!appointment) {
			throw new NotFoundError();
		}

		appointment.complete(completed);

		await this.appointmentRepository.update(appointment);
	}
}
