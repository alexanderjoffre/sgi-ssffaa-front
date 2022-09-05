import { ShowBlock } from "./ShowBlock";

export interface IProgressBarProps {
	currentValue: number;
	maxValue: number;
	fillColor?: 'primary' | 'info' | 'success' | 'warning' | 'danger';
	showIndicatorAt?: 'start' | 'end';
}

export const ProgressBar = (props: IProgressBarProps) => {
	const progress = ((props.currentValue / props.maxValue)  * 100).toFixed(2);
	const indicator = `${progress}%`;
	
	return (
		<div className={`progressbar flex-row-${(props.showIndicatorAt === 'end' ? 'reverse' : '')}`}>
			<ShowBlock if={!!props.showIndicatorAt} 
				Component={<label className="progressbar__indicator">{indicator}</label>}
			/>
			<div className="progressbar__bar">
				<div className={`progressbar__bar-fill bg-${props.fillColor ?? 'primary'}`} 
					style={{ width: indicator }}
				/>
			</div>
		</div>
	)
}