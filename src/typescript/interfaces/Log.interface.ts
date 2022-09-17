export interface ILog {
	// Tracking event ID
	traceId: string;

	// System event who triggers a log
	event: string;

	// IP where action was performed
	ip: string;

	// User account that made the action
	account: string;
	
}