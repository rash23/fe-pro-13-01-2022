// import { AppointmentOperator } from '../domain/appointment';
import { NotFoundError } from '../domain/error';
import { AppointmentRepository } from '../ports/repositories/appointment';

type CompleteAppointmentCommandParams = {
	id: string;
};

export class CompleteAppointmentCommand {
	constructor(private readonly appointmentRepository: AppointmentRepository) {}

	async execute({ id }: CompleteAppointmentCommandParams): Promise<void> {
		const appointment = await this.appointmentRepository.findOne(id);

		if (!appointment) {
			throw new NotFoundError();
		}

		appointment.complete();

		await this.appointmentRepository.update(appointment);
	}
}
