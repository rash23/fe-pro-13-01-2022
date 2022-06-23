import { Appointment } from '../domain/appointment';
import { AppointmentRepository, FindManyFilter } from '../ports/repositories/appointment';

export class ClearAppointmentCommand {
	constructor(private readonly appointmentRepository: AppointmentRepository) {}

	async execute(filter: FindManyFilter): Promise<Appointment[]> {
		const appointments = await this.appointmentRepository.findMany(filter);

		await this.appointmentRepository.clear();

		return appointments;
	}
}
