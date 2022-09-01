import { EIcon } from "../../typescript/enums/Icon.enum";
import { Icon } from "../atoms/Icon";
import { ShowBlock } from "../atoms/ShowBlock";

export interface IButtonProps {
	text: string;
	prefix?: EIcon;
	sufix?: EIcon;
	type: 'primary' | 'danger' | 'success' | 'warning' | 'link';
	onClick(): void;
}

export const Button = (props: IButtonProps) => (
	<button className={`btn btn--${props.type}`} onClick={props.onClick}>
		<ShowBlock if={!!props.prefix} 
			Component={<Icon icon={props.prefix ?? EIcon.NONE} />} 
		/>

		<span className="btn__text">{props.text}</span>

		<ShowBlock if={!!props.sufix} 
			Component={<Icon icon={props.sufix ?? EIcon.NONE} />} 
		/>
	</button>
)