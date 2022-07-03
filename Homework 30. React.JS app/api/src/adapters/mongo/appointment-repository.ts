import { isUndefined } from "lodash";
import { Document, FilterQuery, Model, Types } from "mongoose";
import { AppointmentRecord, Appointment } from "../../domain/appointment";
import { NotFoundError } from "../../domain/error";
import { AppointmentDocument } from "../../infra/mongo/entities/appointment";
import { AppointmentRepository, FindManyFilter } from "../../ports/repositories/appointment";

const mapDocumentToDomainModel = (document: Document<Types.ObjectId, unknown, AppointmentDocument>): Appointment => {
	const { _id, ...record } = document.toObject();

	return Appointment.toModel({
		id: String(_id),
		...record
	});
};

const mapDomainModelToDocument = (appointment: Appointment): { _id: Types.ObjectId } & AppointmentDocument => {
	const {id, ...record} = Appointment.toRecord(appointment);

	return {
		_id: new Types.ObjectId(id),
		...record
	}
};

export class MongoDBAppointmentRepository implements AppointmentRepository {
	constructor(private readonly appointmentEntity: Model<AppointmentDocument>) {} 
	
	async save(record: Partial<AppointmentRecord>): Promise<Appointment> {
		const document = await this.appointmentEntity.create(record);
		
		return mapDocumentToDomainModel(document);
	}
	async findOne(id: string): Promise<Appointment | undefined> {
		const document = await this.appointmentEntity.findById(id).exec();

		if (!document) {
			throw new NotFoundError();
		}

		return mapDocumentToDomainModel(document);
	}
	async findMany({ completed, limit = 100 }: FindManyFilter): Promise<Appointment[]> {
		const queryFilter: FilterQuery<AppointmentDocument> = {};

		if (!isUndefined(completed)) {
			queryFilter.completed = completed;
		}
		
		const documents = await this.appointmentEntity.find(queryFilter).limit(limit).exec();

		return documents.map(mapDocumentToDomainModel);
	}
	async update(appointment: Appointment): Promise<Appointment> {
		const document = await this.appointmentEntity.findById(appointment.id).exec();

		if (!document) {
			throw new NotFoundError();
		}

		const record = mapDomainModelToDocument(appointment);

		await document.update(record).exec();

		return appointment;
	}
	async remove(id: string): Promise<void> {
		const document = await this.appointmentEntity.findById(id).exec();

		if (!document) {
			throw new NotFoundError();
		}

		await document.remove();
	}
}