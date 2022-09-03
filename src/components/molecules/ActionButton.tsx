import { EIcon } from "../../typescript/enums/Icon.enum"
import { Icon } from "../atoms/Icon"

export interface IActionButtonProps {
	icon: EIcon,
	onClick(): void,
}

export const ActionButton = (props: IActionButtonProps) => (
	<button className="action-button" onClick={props.onClick}>
		<Icon icon={props.icon} css="action-button__icon" />
	</button>
);