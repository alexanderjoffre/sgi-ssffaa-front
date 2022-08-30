import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';
import { EDateInterval } from "../typescript/enums/DateInterval.enum";

export class DateAdapter {

	private _dayjs = dayjs;
	private _utc = utc;
	private static instance: DateAdapter;

	private constructor() {
		this._dayjs.extend(this._utc);
	}

	/**
	 * Returns a singleton DateAdapter instance 
	 * @returns DateAdapter
	 */
	public static getAdapter(): DateAdapter {
		if (!DateAdapter.instance) {
			DateAdapter.instance = new DateAdapter();
		}

		return DateAdapter.instance;
	}

	/**
	 * Returns the current timestamp in UTC format YYYY-MM-DDThh:mm:ssZ
	 * @returns string
	 */
	public nowUTC(): string {
		return this._dayjs.utc().format();
	}

	/**
	 * Verify if current timestamp is before a date
	 * @param date string
	 * @returns boolean
	 */
	public isBefore(date: string): boolean {
		return this._dayjs.utc().isBefore(date);
	}

	/**
	 * Verify if current timestamp is after a date
	 * @param date string
	 * @returns boolean
	 */
	public isAfter(date: string): boolean {
		return this._dayjs.utc().isAfter(date);
	}

	/**
	 * Verify if current timestamp is between two dates
	 * @param lowDateInterval string
	 * @param highDateInterval string
	 * @returns boolean
	 */
	public isBetween(
		lowDateInterval: string,
		highDateInterval: string,
	): boolean {
		return (
			this.isAfter(lowDateInterval) && this.isBefore(highDateInterval)
		);
	}

	/**
	 * Add or Subtract date intervals from a base date
	 * 
	 * @param baseDate string
	 * @param quantity number
	 * @param interval EDateInterval
	 * @returns string
	 */
	public add(
		baseDate: string,
		quantity: number,
		interval: EDateInterval
	): string {
		return dayjs(baseDate).add(quantity, interval).utc().format();
	}
};