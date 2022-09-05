import { EIcon } from "../../typescript/enums/Icon.enum"
import { Icon } from "../atoms/Icon"

export interface IActionButtonProps {
	icon: EIcon,
	hoverColor?: 'success' | 'warning' | 'danger';
	onClick(): void,
}

export const ActionButton = (props: IActionButtonProps) => (
	<button className={`action-button action-button--${props.hoverColor ?? 'primary'}`} 
		onClick={props.onClick}
	>
		<Icon icon={props.icon} css="action-button__icon" />
	</button>
);