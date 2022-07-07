import React, { FunctionComponent } from "react";
import { Route, Routes } from "react-router-dom";
import { CreateAppointmentPage } from "./pages/create-appointment";
import { ViewAppointmentPage } from "./pages/view-appointment";

type AppProps = {
	title: string
};

export const App: FunctionComponent<AppProps> = ({ title }) => {
	return (
		<>
			<header>
				<h1>{title}</h1>
			</header>
			<main>
				<Routes>
					<Route path="/">
						<Route index element={<CreateAppointmentPage />} />
						<Route path="/:appointmentId" element={<ViewAppointmentPage />} />
					</Route>
				</Routes>
			</main>
		</>
	)
};