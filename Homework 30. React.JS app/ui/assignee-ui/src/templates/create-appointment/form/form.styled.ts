import styled from 'styled-components';

export const StyledForm = styled.form`
	display: flex;
	flex-direction: column;
`;

export const StyledLabel = styled.label`
	font-weight: bold;
	margin-bottom: 4px;
`;

export const StyledField = styled.div`
	margin-bottom: 6px;
`;

export const StyledInput = styled.input`
	padding: 6px;
	width: 100%;
`;

export const StyledError = styled.span.attrs(() => ({ role: 'alert' }))`
	font-size: 14px;
	margin-top: 4px 0;
	color: tomato;
`;

export const StyleButton = styled.button`
	padding: 10px;
	border: 1px solid black;
	cursor: pointer;
	border-radius: 4px;
	background-color: lightgrey;
	&:hover {
		background-color: grey;
	}
	max-width: 160px;
`;
