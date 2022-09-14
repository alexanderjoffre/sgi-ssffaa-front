import { useState } from "react";
import { ArrayHelper } from "../../helpers/Array.helper";
import { EIcon } from "../../typescript/enums/Icon.enum";
import { Icon } from "../atoms/Icon";
import { ShowBlock } from "../atoms/ShowBlock";

export interface IStarRatingInputProps {
	maxRange: number;
	onChange(value: number): void;
	showIndicator?: boolean;
}

export const StarRatingInput = (props: IStarRatingInputProps) => {
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
		<div className="star-rating-input">
			<div className="star-rating-input__stars">
				{range.map((i: number) => (
					<div
						onClick={() => selectValue(i)}
						onMouseEnter={() => mutateHover(true, i)}
						onMouseLeave={() => mutateHover(false, 0)}
					>
						<Icon 
							icon={showValue >= i ? EIcon.STAR : EIcon.STAR_EMPTY} 
							css={`w-6 ${ showValue >= i ? 'text-warning' : '' }`} 
						/>
					</div>
				))}
			</div>
			<ShowBlock if={!!props.showIndicator} 
				Component={<label className="star-rating-input__indicator">{currentValue}</label>}
			/>
		</div>
	)
}