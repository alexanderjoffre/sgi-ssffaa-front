import { useEffect, useState } from "react"
import { ProgressBar } from "../atoms/ProgressBar";
import { ShowBlock } from "../atoms/ShowBlock";
import { Button } from "./Button";

export interface IStepperProgressStage<T = any> {
	name: string;
	Component: (props: T) => JSX.Element;
	commponentProps: T;
	prevButtonText?: string;
	nextButtonText?: string;
	prevButtonCallback?: () => void;
	nextButtonCallback?: () => void;
}

export interface IStepperProgressProps {
	stages: IStepperProgressStage[];
}

export function StepperProgress({ stages }: IStepperProgressProps) {
	const [step, setStep] = useState<number>(1);
	const [stage, setStage] = useState<IStepperProgressStage>(stages[0]);
	const stagesCount: number = stages.length;

	const prevStep = () => {
		if ( step > 1 ) {
			setStep(step - 1);
		}
		stage.prevButtonCallback && stage.prevButtonCallback();
	};

	const nextStep = () => {
		if ( step < stages.length ) {
			setStep(step + 1);
		}
		stage.nextButtonCallback && stage.nextButtonCallback();
	};

	useEffect(() => {
		setStage(stages[step -1]);
	}, [step]);

	return (
		<div className="stepper-progress">
			<div>
				<ProgressBar
					currentValue={step}
					maxValue={stagesCount}
					fillColor="primary"
				/>

				<div className="stepper-progress__stage-info">
					<label className="stepper-progress__stage-text">
						{stage.name}
					</label>
					
					<label className="stepper-progress__stage-text">
						{step} / {stagesCount}
					</label>
				</div>
			</div>

			<stage.Component {...stage.commponentProps} />

			<div className="stepper-progress__buttons">
				<ShowBlock if={step > 1} Component={
					<Button type="link" onClick={prevStep}
						text={stage.prevButtonText ?? 'Prev'} 
					/>
				}/>

				<Button type="primary" onClick={nextStep}
					text={stage.nextButtonText ?? 'Next'} 
				/>
			</div>
		</div>
	)
}