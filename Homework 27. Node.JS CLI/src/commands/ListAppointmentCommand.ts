import { Appointment } from '../domain/appointment';
import { AppointmentRepository, FindManyFilter } from '../ports/repositories/appointment';

export class ListAppointmentCommand {
	constructor(private readonly appointmentRepository: AppointmentRepository) {}

	async execute(filter: FindManyFilter): Promise<Appointment[]> {
		return await this.appointmentRepository.findMany(filter);
	}
}
