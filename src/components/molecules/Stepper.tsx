import { useState } from "react"
import { TabBlock } from "../atoms/TabBlock";

export interface IStepperProps {
	stages: JSX.Element[];
}

export const Stepper = (props: IStepperProps) => {
	const [step, setStep] = useState(1);

	return (
		<div className="stepper">
			<TabBlock step={step} components={props.stages} />
		</div>
	)
}