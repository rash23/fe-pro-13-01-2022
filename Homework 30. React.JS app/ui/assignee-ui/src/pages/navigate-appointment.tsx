import React, { FunctionComponent, useState } from 'react';

import { StyledNavigateWrapper, StyleBtn } from '../templates/navigate-appoinment/navigate-appoinment.styled';
import { baseURL } from '../shared/api/request';
import { useNavigate } from 'react-router-dom';

type dataAppointment = {
	data: {
		id: string;
		ticket: string;
		assignee: {
			fullName: string;
			email: string;
		};
		operator?: {
			fullName: string;
			email: string;
		};
		completed: boolean;
		created_at: string;
		updated_at: string;
	};
};

export const MoveToAppointment: FunctionComponent<dataAppointment> = (props: dataAppointment) => {
	const navigate = useNavigate();
	const [isCopied, setCopied] = useState(false);

	const copyAppointment = () => {
		if (props.data !== null) {
			const uri = `${baseURL}/${props.data.id}`;

			navigator.clipboard.writeText(String(uri));

			setCopied(true);
		}
	};

	const moveToAppointment = () => {
		if (props.data !== null) {
			return navigate(`../${props.data.id}`, { replace: true });
		}
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
			</StyledNavigateWrapper>
		</>
	);
};
