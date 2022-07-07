import { Appointment } from "../domain/appointment";
import { post, get } from "./request";

export type CreateAppointment = {
	fullName: string;
	email: string;
}

export const createAppointment = ({ fullName, email }: CreateAppointment): Promise<Appointment> => {
	return post<Appointment>("appointment", { fullName, email });
};

export type GetAppointment = {
	id: string;
}

export const getAppointment = ({ id }: GetAppointment): Promise<Appointment> => {
	return get<Appointment>(`appointment/${id}`);
};