import { useState } from "react";
import { ArrayHelper } from "../../helpers/Array.helper";
import { EIcon } from "../../typescript/enums/Icon.enum";
import { Icon } from "../atoms/Icon";
import { ShowBlock } from "../atoms/ShowBlock";

export interface IInputStarRatingProps {
	maxRange: number;
	onChange(value: number): void;
	showIndicator?: boolean;
}

export const InputStarRating = (props: IInputStarRatingProps) => {
	const [currentValue, setCurrentValue] = useState<number>(0);
	const [showValue, setShowValue] = useState<number>(0);

	const range: number[] = ArrayHelper.makeRange(props.maxRange);

	const mutateHover = (isMouseIn: boolean, value: number) => {
		setShowValue(isMouseIn ? value : currentValue);
	}

	const selectValue = (value: number) => {
		setCurrentValue(value);
		props.onChange(value);
	}

	return (
		<div className="input-star-rating">
			<div className="input-star-rating__stars">
				{range.map((i: number) => (
					<div
						onClick={() => selectValue(i)}
						onMouseEnter={() => mutateHover(true, i)}
						onMouseLeave={() => mutateHover(false, 0)}
					>
						<Icon 
							icon={showValue >= i ? EIcon.STAR : EIcon.STAR_EMPTY} 
							css={`w-6 ${ showValue >= i && 'text-warning'}`} 
						/>
					</div>
				))}
			</div>
			<ShowBlock if={!!props.showIndicator} 
				Component={<label className="input-star-rating__indicator">{currentValue}</label>}
			/>
		</div>
	)
}