import { Appointment } from '../domain/appointment';
import { NotFoundError } from '../domain/error';
import { AppointmentRepository } from '../ports/repositories/appointment';

type DeleteAppointmentCommandParams = {
	id: string;
};

export class DeleteAppointmentCommand {
	constructor(private readonly appointmentRepository: AppointmentRepository) {}

	async execute({ id }: DeleteAppointmentCommandParams): Promise<Appointment> {
		const appointment = await this.appointmentRepository.findOne(id);

		if (!appointment) {
			throw new NotFoundError();
		}

		return appointment;
	}
}
