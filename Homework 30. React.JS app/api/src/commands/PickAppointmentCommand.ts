import { AppointmentOperator } from "../domain/appointment";
import { NotFoundError } from "../domain/error";
import { AppointmentRepository } from "../ports/repositories/appointment";

type PickAppointmentCommandParams = {
	id: string;
	operator: AppointmentOperator;
};

export class PickAppointmentCommand {
	constructor(private readonly appointmentRepository: AppointmentRepository) {}

	async execute({ id, operator }: PickAppointmentCommandParams): Promise<void> {
		const appointment = await this.appointmentRepository.findOne(id);

		if (!appointment) {
			throw new NotFoundError();
		}

		appointment.pick(operator);

		await this.appointmentRepository.update(appointment);
	}
}
