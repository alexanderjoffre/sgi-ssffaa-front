import { IHasUuid } from "../../../typescript/interfaces/HasUuid.interface";

export interface IInputCalendarCellProps extends IHasUuid {
	day: number;
	date: string;
	selected: boolean;
	disabled: boolean;
	onClick(date: string): void;
}

export const InputCalendarCell = (props: IInputCalendarCellProps) => {
	return (
		<div
			className={`
				calendar__date 
				${props.selected && 'calendar__date--selected'}
				${props.disabled && 'calendar__date--disabled'}
			`}
			onClick={() => !props.disabled && props.onClick(props.date)}
		>
			{props.day}
		</div>
	);
}