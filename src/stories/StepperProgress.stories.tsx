import { StepperProgress, IStepperProgressProps, IStepperProgressStage } from '../components/molecules/StepperProgress';
import { EIcon } from '../typescript/enums/Icon.enum';
import { StoryBookItem } from '../helpers/StoryBookItem.helper';

const storybookItem = new StoryBookItem(StepperProgress);

export default storybookItem.createMetadata( 
  'molecules/Stepper Progress', 
  'Let\'s developers to create multi stage forms',
  {
    argTypes: {
      prefix: StoryBookItem.makeSelectControl(EIcon),
      sufix: StoryBookItem.makeSelectControl(EIcon),
    }
  }
);

interface ITestComponent {name: string}
const TestComponent = ({name}: ITestComponent) => (
  <p>{name}</p>
)

const stageOne: IStepperProgressStage<ITestComponent> = {
	name: 'First',
	Component: TestComponent,
	commponentProps: { name: 'This is the first stage' },
  nextButtonText: 'Go to Second',
}

const stageTwo: IStepperProgressStage<ITestComponent> = {
	name: 'Second',
	Component: TestComponent,
	commponentProps: { name: 'This is the second stage' },
  prevButtonText: 'Go to First',
  nextButtonText: 'Go to Last',
}

const stageLast: IStepperProgressStage<ITestComponent> = {
	name: 'Last',
	Component: TestComponent,
	commponentProps: { name: 'This is the last stage' },
  prevButtonText: 'Go to Second',
  nextButtonText: 'Finish',
  nextButtonCallback() {
    alert('You reached the end');
  },
}

export const Normal = storybookItem.createTemplate<IStepperProgressProps>({
  stages: [stageOne, stageTwo, stageLast]
});