export interface ILog {

	// Id for process traceability
	traceId: string;

	// System event who triggers a log
	event: string;

	// Code method who triggers a log in format method:lineNumber
	origin: string;

	// Code method who triggers a log in format method:lineNumber
	payload: Record<string, string>;
}