import React, { FunctionComponent } from 'react';
import { Appointment } from '../../../shared/domain/appointment';
import { baseURL } from '../../../shared/api/request';
import { Link } from 'react-router-dom';

export type CreateAppointmentOutputProps = {
	appointment: Appointment;
};

export const CreateAppointmentOutput: FunctionComponent<CreateAppointmentOutputProps> = ({ appointment }) => {
	const uri = `${baseURL}/${appointment.id}`;

	return (
		<div>
			<Link to={appointment.id}>{uri}</Link>
		</div>
	);
};
