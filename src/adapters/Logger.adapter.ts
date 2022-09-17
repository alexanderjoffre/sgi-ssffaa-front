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
				created_at: dateAdapter.now(),
			},
			transports: [
				new this._winston.transports.File({ filename: 'error.log', level: 'error' }),
				new this._winston.transports.File({ filename: 'sgi.log' }),
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
	 * Generate stdout on OS with info level
	 * @param content ILog
	 * @param message string
	 */
	public info(content: ILog): void {
		this._logger.info( 'SystemLogger', { level: 'info', ...content } );
	}

	/**
	 * Generate stdout on OS with warning level
	 * @param content ILog
	 * @param message string
	 */
	public warning(content: ILog): void {
		this._logger.warn( 'SystemLogger', { level: 'warning', ...content } );
	}

	/**
	 * Generate stdout on OS with error level
	 * @param content ILog
	 * @param message string
	 */
	public error(content: ILog): void {
		this._logger.error( 'SystemLogger', { level: 'error', ...content } );
	}
}