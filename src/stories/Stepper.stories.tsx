import { Stepper, IStepperProps } from '../components/molecules/Stepper';
import { EIcon } from '../typescript/enums/Icon.enum';
import { StoryBookItem } from '../helpers/StoryBookItem.helper';

const storybookItem = new StoryBookItem(Stepper);

export default storybookItem.createMetadata( 
  'molecules/Stepper', 
  'Let\'s developers to create multi stage forms',
  {
    argTypes: {
      prefix: StoryBookItem.makeSelectControl(EIcon),
      sufix: StoryBookItem.makeSelectControl(EIcon),
    }
  }
);

export const Normal = storybookItem.createTemplate<IStepperProps>({
    stages: [
      <p>Step 1</p>,
      <p>Step 2</p>,
      <p>Step 3</p>,
    ]
});