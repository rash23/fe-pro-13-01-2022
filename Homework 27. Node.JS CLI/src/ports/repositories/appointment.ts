import { Appointment, AppointmentId } from '../../domain/appointment';

export type FindManyFilter = {
	// completed?: boolean;
	status?: boolean;
	limit?: number;
};

export interface AppointmentRepository {
	save(appointment: Appointment): Promise<Appointment>;
	findOne(id: AppointmentId): Promise<Appointment | undefined>;
	findMany(filter: FindManyFilter): Promise<Appointment[]>;
	update(appointment: Appointment): Promise<Appointment>;
	remove(id: AppointmentId): Promise<void>;
	clear(): Promise<void>;
}
