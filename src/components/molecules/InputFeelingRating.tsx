import { useState } from "react";
import { EIcon } from "../../typescript/enums/Icon.enum";
import { Icon } from "../atoms/Icon";
import { ShowBlock } from "../atoms/ShowBlock";

type feelings = 'angry' | 'bad' | 'neutral' | 'good' | 'happy' | null;

export interface IInputFeelingRatingProps {
	faces: 3 | 5;
	onChange(value: feelings): void;
	showIndicator?: boolean;
}

export const InputFeelingRating = (props: IInputFeelingRatingProps) => {
	const [currentValue, setCurrentValue] = useState<feelings>(null);

	const selectValue = (value: feelings) => {
		setCurrentValue(value);
		props.onChange(value);
	}

	return (
		<div className="input-feeling-rating">
			<div className="input-feeling-rating__faces">

					<div onClick={() => selectValue('angry')} >
						<Icon icon={EIcon.FACE_ANGRY}
						css={`w-8 ${ currentValue === 'angry' ? 'text-danger' : 'hover:text-danger' }`}
						/>
					</div>

					<ShowBlock if={ props.faces === 3 }
						Component={
							<div onClick={() => selectValue('bad')} >
								<Icon icon={EIcon.FACE_BAD}
								css={`w-8 ${ currentValue === 'bad' ? 'text-warning' : 'hover:text-warning' }`}
								/>
							</div>
						}
					/>

					<div onClick={() => selectValue('neutral')} >
						<Icon icon={EIcon.FACE_NEUTRAL}
						css={`w-8 ${ currentValue === 'neutral' ? 'text-warning' : 'hover:text-warning' }`}
						/>
					</div>

					<ShowBlock if={ props.faces === 3 }
						Component={
							<div onClick={() => selectValue('good')} >
								<Icon icon={EIcon.FACE_GOOD}
								css={`w-8 ${ currentValue === 'good' ? 'text-success' : 'hover:text-success' }`}
								/>
							</div>
						}
					/>

					<div onClick={() => selectValue('happy')} >
						<Icon icon={EIcon.FACE_HAPPY} 
						css={`w-8 ${ currentValue === 'happy' ? 'text-success' : 'hover:text-success' }`}
						/>
					</div>

			</div>
			<ShowBlock if={!!props.showIndicator} 
				Component={<label className="input-feeling-rating__indicator">{currentValue}</label>}
			/>
		</div>
	)
}