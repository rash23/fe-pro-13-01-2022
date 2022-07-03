export type AppointmentId = string;

export type AppointmentAssignee = {
	fullName: string;
	email: string;
};

export type AppointmentOperator = {
	fullName: string;
	email: string;
};

export type AppointmentRecord = {
	id: AppointmentId;
	ticket: string;
	assignee: AppointmentAssignee;
	operator?: AppointmentOperator;
	completed: boolean;
	created_at: string;
	updated_at: string;
};

export class Appointment {
	private record: AppointmentRecord;

	private constructor(record: AppointmentRecord) {
		this.record = record;
	}

	get id() {
		return this.record.id;
	}

	get ticket() {
		return this.record.ticket;
	}

	get assignee() {
		return this.record.assignee;
	}

	get operator() {
		return this.record.operator;
	}

	get completed() {
		return this.record.completed;
	}

	get created_at() {
		return this.record.created_at;
	}

	get updated_at() {
		return this.record.updated_at;
	}

	pick(operator: AppointmentOperator): void {
		this.record.operator = operator;
	};

	static toRecord(appointment: Appointment): AppointmentRecord {
		return appointment.record;
	}

	static toModel(record: AppointmentRecord): Appointment {
		return new Appointment(record);
	}

	static create(assignee: AppointmentAssignee): Partial<AppointmentRecord> {
		const now = new Date();

		return {
			ticket: Appointment.generateId(now),
			assignee,
			completed: false,
		};
	}

	private static generateId(now: Date): string {
		return `AP-${now.getHours()}/${now.getMinutes()}/${now.getSeconds()}/${now.getMilliseconds()}`;
	}
}