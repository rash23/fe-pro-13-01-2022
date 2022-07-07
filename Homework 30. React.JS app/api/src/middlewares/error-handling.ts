import type { Request, Response, NextFunction } from "express";
import { BadRequest, NotFoundError } from "../domain/error";
import { Logger } from "../ports/logger";

const mapErrorToStatus = (err: Error): number => {
	if (err instanceof BadRequest) {
		return 400;
	}

	if (err instanceof NotFoundError) {
		return 404;
	}

	return 500;
};

export const handleErrorMiddleware = (logger: Logger) => {
	return (err: Error, _req: Request, res: Response, next: NextFunction) => {
		const statusCode = mapErrorToStatus(err);

		res.status(statusCode);
	
		logger.alert(err.message, err.name);

		res.json({
			status: statusCode,
			message: err.message
		});

		next();
	};
}