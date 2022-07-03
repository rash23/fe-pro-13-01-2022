import * as yup from "yup";
import { Request, Response, NextFunction } from "express";

export type ExpressSuccessResponse<Data> = {
	status: number;
	data: Data;
}

export type ExpressFailedResponse = {
	status: number;
	message: string;
}

type ExpressHandlerFunction<Req, Res> = (req: Req, res: Res) => Promise<unknown> 

export const route = <Req extends Request, Res extends Response>(
	handler: ExpressHandlerFunction<Req, Res>,
	schema?: yup.AnySchema,
) => {
	return async (req: Req, res: Res, next: NextFunction) => {
		try {
			if (schema) {
				await schema?.validate(req);
			}

			const response = await handler(req, res);

			res.json({
				status: res.statusCode,
				data: response
			});
		} catch (error) {
			next(error);
		}
	}
}