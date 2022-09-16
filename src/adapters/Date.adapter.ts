import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import relativeTime from 'dayjs/plugin/relativeTime';
import { EDateInterval } from "../typescript/enums/DateInterval.enum";
import { EDatePart } from "../typescript/enums/DateFormat.enum";
export class DateAdapter {

	private _dayjs = dayjs;
	private _utc = utc;
	private _relativeTime = relativeTime;
	private _isSameOrBefore = isSameOrBefore;
	private _isSameOrAfter = isSameOrAfter;
	private static instance: DateAdapter;

	private constructor() {
		require('dayjs/locale/es');
		
		this._dayjs.extend(this._utc);
		this._dayjs.extend(this._relativeTime);
		this._dayjs.extend(this._isSameOrBefore);
		this._dayjs.extend(this._isSameOrAfter);
		this._dayjs.locale('es');
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
	 * Returns the current timestamp in format YYYY-MM-DDThh:mm:ss
	 * @returns string
	 */
	public now(
		format: EDatePart = EDatePart.FULL_DATE
	): string {
		return this._dayjs().format(format);
	}

	/**
	 * Returns the datepart for a specific date
	 * @returns string
	 */
	public datePart(
		date: string,
		format: EDatePart = EDatePart.FULL_DATE
	): string {
		return this._dayjs(date).format(format);
	}

	/**
	 * Verify if cbaseDate is before targetDate
	 * @param baseDate string
	 * @param targetDate string
	 * @returns boolean
	 */
	public isBefore(baseDate: string, targetDate: string ): boolean {
		return this._dayjs(baseDate).isSameOrBefore(targetDate);
	}

	/**
	 * Verify if baseDate is after targetDate
	 * @param baseDate string
	 * @param targetDate string
	 * @returns boolean
	 */
	public isAfter(baseDate: string, targetDate: string): boolean {
		return this._dayjs(baseDate).isSameOrAfter(targetDate);
	}

	/**
	 * Verify if baseDate between two dates
	 * @param baseDate string
	 * @param lowDateInterval string
	 * @param highDateInterval string
	 * @returns boolean
	 */
	public isBetween(
		baseDate: string,
		lowDateInterval: string,
		highDateInterval: string,
	): boolean {
		return (
			this.isAfter(baseDate, lowDateInterval) && this.isBefore(baseDate, highDateInterval)
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

	public from(
		relativeDate: string, 
		withoutSuffix: boolean = false
	): string {
		return this._dayjs(relativeDate)	.fromNow(withoutSuffix);
	}

	/**
	 * Returns the first date of a month in a specific format
	 *  
	 * @param date input date
	 * @param format output fomart
	 * @returns string
	 */
	public startOfMonth( 
		date: string, 
		format: EDatePart = EDatePart.DATE 
	): string {
		return this._dayjs(date).startOf('month').format(format);
	}

	public startWeekDayOfMonth(date: string): number {
		const daysOrder = ['1','2','3','4','5','6','0'];
		return daysOrder.indexOf(
			this.startOfMonth(date, EDatePart.DAY_OF_WEEK)
		) + 1
	}

	/**
	 * Returns the last date of a month in a specific format
	 *  
	 * @param date input date
	 * @param format output fomart
	 * @returns string
	 */
	public endOfMonth( 
		date: string, 
		format: EDatePart = EDatePart.DATE 
	): string {
		return this._dayjs(date).endOf('month').format(format);
	}
};