import React, { FunctionComponent, useState } from 'react';
import { Appointment } from '.././shared/domain/appointment';
import { StyledNavigateWrapper, StyleBtn } from '../templates/navigate-appoinment/navigate-appoinment.styled';
import { baseURL } from '../shared/api/request';
import { useNavigate, Link } from 'react-router-dom';

export type NavigateAppointmentProps = {
	appointment: Appointment;
};

export const MoveToAppointment: FunctionComponent<NavigateAppointmentProps> = (props: NavigateAppointmentProps) => {
	const navigate = useNavigate();
	const [isCopied, setCopied] = useState(false);
	const uri = `${baseURL}/${props.appointment.id}`;

	const copyAppointment = () => {
		navigator.clipboard.writeText(String(uri));

		setCopied(true);
	};

	const moveToAppointment = () => {
		navigate(`../${props.appointment.id}`, { replace: true });
	};

	return (
		<>
			<StyledNavigateWrapper>
				{isCopied ? (
					<StyleBtn
						onClick={copyAppointment}
						style={{
							backgroundColor: '#04BEFF',
						}}
					>
						Copied
					</StyleBtn>
				) : (
					<StyleBtn onClick={copyAppointment}>Copy</StyleBtn>
				)}

				<StyleBtn onClick={moveToAppointment}>Navigate</StyleBtn>
				<Link to={props.appointment.id}>{uri}</Link>
			</StyledNavigateWrapper>
		</>
	);
};
