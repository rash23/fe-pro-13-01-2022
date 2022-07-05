import React, { FunctionComponent, useState } from 'react';
import { StyledContainer } from '../components/layout.styled';
import { createAppointment } from '../shared/api/appointment';
import { Appointment } from '../shared/domain/appointment';
import { CreateAppointmentForm, FormValues } from '../templates/create-appointment/form/form';
import { CreateAppointmentOutput } from '../templates/create-appointment/output/output';
import { StyledNavigateWrapper } from '../templates/navigate-appoinment/navigate-appoinment.styled';
import { MoveToAppointment } from './navigate-appointment';

export const CreateAppointmentPage: FunctionComponent = () => {
	const [appointment, setAppointment] = useState<Appointment | null>(null);

	const handleCreateAppointment = async ({ fullName, email }: FormValues) => {
		const appointment = await createAppointment({ fullName, email });

		setAppointment(appointment);
	};

	return (
		<>
			<StyledContainer>
				<CreateAppointmentForm onFormSubmit={handleCreateAppointment} />
			</StyledContainer>

			{appointment && (
				<StyledContainer>
					<StyledNavigateWrapper>
						<MoveToAppointment data={appointment} />
						<CreateAppointmentOutput appointment={appointment} />
					</StyledNavigateWrapper>
				</StyledContainer>
			)}
		</>
	);
};
