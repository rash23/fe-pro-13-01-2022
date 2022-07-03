import React, { FunctionComponent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAppointment } from '../shared/api/appointment';
import { StyledContainer } from '../components/layout.styled';
import { Appointment } from '../shared/domain/appointment';

type PageParams = {
	appointmentId: string;
};

export const ViewAppointmentPage: FunctionComponent = () => {
	const [appointment, setAppointment] = useState<Appointment | null>(null);

	const { appointmentId } = useParams<PageParams>();

	useEffect(() => {
		const fetchAppointment = async (id: string) => {
			const appointment = await getAppointment({ id });

			setAppointment(appointment);
		};

		if (appointmentId) {
			fetchAppointment(appointmentId);
		}
	}, [appointmentId]);

	return (
		<>
			<h1>Your are welcome here</h1>
			<StyledContainer>
				<p>Your ticket:</p>
				{appointment && <span>{appointment.ticket}</span>}
			</StyledContainer>
		</>
	);
};
