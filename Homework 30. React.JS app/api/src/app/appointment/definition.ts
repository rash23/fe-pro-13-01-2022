import * as yup from "yup";

import { AppointmentId, AppointmentAssignee, AppointmentOperator } from "../../domain/appointment"

export type CreateBody = AppointmentAssignee;
export const createBodySchema = yup.object().shape({
  body: yup.object().shape({
		fullName: yup.string().required(),
		email: yup.string().email().required(),
	})
});

export type GetParams = {
	id: AppointmentId;
} 

export type ListQuery = {
	completed?: boolean;
	limit?: number;
}

export type PickParams = {
	id: AppointmentId;
}

export type PickBody = AppointmentOperator;