export enum CLICommand {
	CREATE = 'create',
	GET = 'get',
	COMPLETE = 'complete',
	DELETE = 'delete',
	LIST = 'list',
	CLEAR = 'clear',
}

export interface CLI {
	getCommand(): string;
	getQuery<T>(): T;
}
