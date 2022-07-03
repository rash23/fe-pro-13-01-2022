import { Appointment, AppointmentAssignee } from "../domain/appointment";
import { AppointmentRepository } from "../ports/repositories/appointment";

type GetAppointmentCommandParams = {
	assignee: AppointmentAssignee;
};

export class CreateAppointmentCommand {
	constructor(private readonly appointmentRepository: AppointmentRepository) {}

	async execute({ assignee }: GetAppointmentCommandParams): Promise<Appointment> {
		const appointment = Appointment.create(assignee);

		return this.appointmentRepository.save(appointment);
	}
}
