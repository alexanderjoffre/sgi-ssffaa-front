import { DateAdapter } from "../../../adapters/Date.adapter";
import { ArrayHelper } from "../../../helpers/Array.helper";
import { EDatePart } from "../../../typescript/enums/DateFormat.enum";
import { IInputCalendarCellProps } from "./InputCalendarCell";

const dateAdapter: DateAdapter = DateAdapter.getAdapter();

export const makeDaysRange = (
	currentPeriod: string,
	selectedDate: string,
	onClick: (date: string) => void,
	minDate?: string,
	maxDate?: string,
	onlyWorkingDays: boolean = false,
): IInputCalendarCellProps[] => {
	const range = ArrayHelper.makeRange( + dateAdapter.endOfMonth(currentPeriod, EDatePart.DAY) );
	const month = dateAdapter.datePart(currentPeriod, EDatePart.MONTH);
	const year = dateAdapter.datePart(currentPeriod, EDatePart.YEAR);

	return range.map( (day: number): IInputCalendarCellProps => {
		const date = `${year}-${ `0${month}`.slice(-2) }-${ `0${day}`.slice(-2) }`;
		
		const outOfRange: boolean = !dateAdapter.isBetween(
			date, 
			minDate || currentPeriod,
			maxDate || dateAdapter.endOfMonth(currentPeriod, EDatePart.DATE)
		)

		const isWorkingDate: boolean = 
		+dateAdapter.datePart(date, EDatePart.DAY_OF_WEEK) > 0
		&& +dateAdapter.datePart(date, EDatePart.DAY_OF_WEEK) < 6

		return {
			uuid: `day-${day}`,
			day,
			onClick,
			disabled: outOfRange || (onlyWorkingDays && !isWorkingDate),
			selected: (
				year === dateAdapter.datePart(selectedDate, EDatePart.YEAR)
				&& month === dateAdapter.datePart(selectedDate, EDatePart.MONTH)
				&& day === +dateAdapter.datePart(selectedDate, EDatePart.DAY)
			),
			date,
		}
	});
}