import { useContext, useEffect, useState } from "react";
import { DateAdapter } from "../../../adapters/Date.adapter";
import { EDatePart } from "../../../typescript/enums/DateFormat.enum";
import { Card } from "../../atoms/Card";
import { LoopBlock } from "../../atoms/LoopBlock";
import { AppContext } from "../../../contexts/App.context";
import { Icon } from "../../atoms/Icon";
import { EIcon } from "../../../typescript/enums/Icon.enum";
import { EDateInterval } from "../../../typescript/enums/DateInterval.enum";
import { InputCalendarCell, IInputCalendarCellProps } from "./InputCalendarCell";
import { makeDaysRange } from "./CalendarCommons";

const dateAdapter: DateAdapter = DateAdapter.getAdapter();

export interface IInputCalendarProps {
	minRange?: string;
	maxRange?: string;
	onlyWorkingDays?: boolean;
	onChange(date: string): void;
}

export const InputCalendar = (props: IInputCalendarProps) => {
	const appContext = useContext(AppContext);
	const [currentDate] = useState<string>(dateAdapter.now(EDatePart.DATE));
	const [currentPeriod, setCurrentPeriod] = useState<string>(dateAdapter.startOfMonth(currentDate));
	const [selectedDate, setSelectedDate] = useState<string>(currentDate);

	const [dates, setDates] = useState<IInputCalendarCellProps[]>([]);
	const [startWeekday, setStartWeekday] = useState<number>(
		dateAdapter.startWeekDayOfMonth(currentPeriod)
	);

	const prevMonth = () => {
		const prev = dateAdapter.add(currentPeriod, -1, EDateInterval.MONTH);
		setCurrentPeriod(prev);
	}

	const nextMonth = () => {
		const next = dateAdapter.add(currentPeriod, 1, EDateInterval.MONTH);
		setCurrentPeriod(next);
	}

	const refreshDates = () => {
		setDates( makeDaysRange( 
			currentPeriod, 
			selectedDate, 
			(date: string) => { setSelectedDate(date);  props.onChange(date); },
			props.minRange,
			props.maxRange,
			props.onlyWorkingDays,
		));
	}

	useEffect( () => {
		refreshDates();
	}, [selectedDate]);

	useEffect( () => {
		refreshDates();
		setStartWeekday(dateAdapter.startWeekDayOfMonth(currentPeriod));
	}, [currentPeriod]);

	return (
		<div className="calendar">
			<Card shadow rounded>
				<>
					<div className="calendar__month">
						<div className="calendar__arrow" onClick={prevMonth}>
							<Icon icon={EIcon.ARROW_LEFT} />
						</div>
						<div className="calendar__month-name">
							<span>
								{dateAdapter.datePart(currentPeriod, EDatePart.MONTH_NAME)}
							</span>
							<span>
								{dateAdapter.datePart(currentPeriod, EDatePart.YEAR)}
							</span>
						</div>
						<div className="calendar__arrow" onClick={nextMonth}>
							<Icon icon={EIcon.ARROW_RIGHT} />
						</div>
					</div>
					<div className="calendar__heading">
					{appContext.language.daysOfWeekShort.map( (dayOfWeek: string) => (
						<div key={dayOfWeek} className="calendar__heading-cell">{dayOfWeek}</div>
					))}
					</div>
					<div className={`calendar__dates calendar__dates--start-${startWeekday}`}>
						<LoopBlock list={dates} Component={InputCalendarCell} />
					</div>
				</>
			</Card>
		</div>
	);
}