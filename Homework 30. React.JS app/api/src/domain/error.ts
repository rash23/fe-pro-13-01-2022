export class BadRequest extends Error {
	name = "BadRequest";
}

export class NotFoundError extends Error {
	constructor() {
		super("Not Found");
	}
}
