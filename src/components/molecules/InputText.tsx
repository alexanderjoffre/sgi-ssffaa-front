import { useState } from "react";
import { EIcon } from "../../typescript/enums/Icon.enum";
import { Icon } from "../atoms/Icon";
import { ShowBlock } from "../atoms/ShowBlock";

export interface IInputText {
	value: string | number;
	label?: string;
	placeholder?: string;
	belowText?: string;
	type: 'text' | 'password';
	belowTextType?: 'success' | 'danger';
	prefix?: EIcon;
	sufix?: EIcon;
	onChange?: () => void;
	onBlur?: () => void;
}

export const InputText = (props: IInputText) => {
	const [isActive, setIsActive] = useState<boolean>(false);

	return (
		<div className="input-text">

			<ShowBlock if={!!props.label} 
				Component={<label className="input-text__label">{props.label}</label>} 
			/>

			<div className={`input-text__container ${isActive ? 'input-text__container--active' : ''}`}>
				<ShowBlock if={!!props.prefix} 
					Component={<Icon icon={props.prefix ?? EIcon.NONE} css='input-text__icon'/>} 
				/>

				<input type={props.type} className="input-text__input"
					value={props.value}
					placeholder={props.placeholder}
					onChange={props.onChange}
					onBlur={() => { 
						setIsActive(false); 
						props.onBlur && props.onBlur();
					}}
					onFocus={() => setIsActive(true)}
				/>

				<ShowBlock if={!!props.sufix} 
					Component={<Icon icon={props.sufix ?? EIcon.NONE} css='input-text__icon'/>} 
				/>
			</div>

			<ShowBlock if={!!props.label} Component={
					<span className={
						`input-text__below-text text-${props.belowTextType ?? 'gray'}`
					}>
						{props.belowText}
					</span>
			} />

		</div>
	)
};