import winston from 'winston';
import { ILog } from '../typescript/interfaces/Log.interface';
import { DateAdapter } from './Date.adapter';

export class LoggerAdapter {

	private _winston= winston
	private _logger: winston.Logger;
	private static instance: LoggerAdapter;

	private constructor() {
		const dateAdapter = DateAdapter.getAdapter();

		this._logger = this._winston.createLogger({
			level: 'info',
			format: this._winston.format.json(),
			defaultMeta: {
				appId: process.env.NEXT_PUBLIC_APP_NAME,
				created_at: dateAdapter.nowUTC(),
			},
			transports: [
				new this._winston.transports.Console()
			]
		})
	}

	/**
	 * Returns a singleton LoggerAdapter instance 
	 * @returns LoggerAdapter
	 */
	public static getAdapter(): LoggerAdapter {
		if (!LoggerAdapter.instance) {
			LoggerAdapter.instance = new LoggerAdapter();
		}

		return LoggerAdapter.instance;
	}

	/**
	 * Generate stfout on OS with info level
	 * @param content ILog
	 * @param message string
	 */
	public info(content: ILog, message: string): void {
		this._logger.info( message, content );
	}

	/**
	 * Generate stfout on OS with warning level
	 * @param content ILog
	 * @param message string
	 */
	public warning(content: ILog, message: string): void {
		this._logger.warn( message, content );
	}

	/**
	 * Generate stfout on OS with error level
	 * @param content ILog
	 * @param message string
	 */
	public error(content: ILog, message: string): void {
		this._logger.error( message, content );
	}
}