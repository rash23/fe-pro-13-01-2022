import React, { FunctionComponent, useState } from 'react';
import { StyledContainer } from '../components/layout.styled';
import { createAppointment } from '../shared/api/appointment';
import { Appointment } from '../shared/domain/appointment';
import { CreateAppointmentForm, FormValues } from '../templates/create-appointment/form/form';
import { CreateAppointmentOutput } from '../templates/create-appointment/output/output';
import { StyledNavigateWrapper, StyleBtn } from '../templates/navigate-appoinment/navigate-appoinment.styled';
import { baseURL } from '../shared/api/request';
import { useNavigate } from 'react-router-dom';

export const CreateAppointmentPage: FunctionComponent = () => {
	const [appointment, setAppointment] = useState<Appointment | null>(null);
	const navigate = useNavigate();

	const handleCreateAppointment = async ({ fullName, email }: FormValues) => {
		const appointment = await createAppointment({ fullName, email });

		setAppointment(appointment);
	};

	const copyAppointment = (event: React.SyntheticEvent<EventTarget>) => {
		if (appointment !== null) {
			const uri = `${baseURL}/${appointment.id}`;

			navigator.clipboard.writeText(String(uri));
			let target = event.target as HTMLButtonElement;

			target.innerText = 'Copied';
			target.style.background = '#04BEFF';
		}
	};

	const moveToAppointment = () => {
		if (appointment !== null) {
			return navigate(`../${appointment.id}`, { replace: true });
		}
	};

	return (
		<>
			<StyledContainer>
				<CreateAppointmentForm onFormSubmit={handleCreateAppointment} />
			</StyledContainer>

			<StyledContainer>
				<StyledNavigateWrapper>
					<StyleBtn onClick={copyAppointment}>Copy</StyleBtn>
					<StyleBtn onClick={moveToAppointment}>Navigate</StyleBtn>
					{appointment && <CreateAppointmentOutput appointment={appointment} />}
				</StyledNavigateWrapper>
			</StyledContainer>
		</>
	);
};
