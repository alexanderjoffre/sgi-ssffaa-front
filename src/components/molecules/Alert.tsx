import { EIcon } from "../../typescript/enums/Icon.enum";
import { Icon } from "../atoms/Icon";

export interface IAlertProps {
	type: 'info' | 'success' | 'warning' | 'danger';
	children: JSX.Element;
}

const iconMapper: Map<string, EIcon> = new Map([
	['info', EIcon.INFO],
	['success', EIcon.SUCCESS],
	['warning', EIcon.WARNNING],
	['danger', EIcon.DANGER],
]);

export const Alert = (props: IAlertProps) => (
	<div className={`alert alert--${props.type}`}>
		<Icon icon={iconMapper.get(props.type) ?? EIcon.INFO} />
		{props.children}
	</div>
);