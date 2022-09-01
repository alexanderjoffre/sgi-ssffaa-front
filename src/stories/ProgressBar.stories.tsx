import { ProgressBar, IProgressBarProps } from '../components/atoms/ProgressBar';
import { EIcon } from '../typescript/enums/Icon.enum';
import { StoryBookItem } from '../helpers/StoryBookItem.helper';

const storybookItem = new StoryBookItem(ProgressBar);

export default storybookItem.createMetadata( 
  'molecules/ProgressBar', 
  'ProgressBar component let\'s developers to create multi stage forms',
  {
    argTypes: {
      prefix: StoryBookItem.makeSelectControl(EIcon),
      sufix: StoryBookItem.makeSelectControl(EIcon),
    }
  }
);

export const WithoutIndicator = storybookItem.createTemplate<IProgressBarProps>(
  {currentValue: 75, maxValue: 150}
);

export const WithFillColor = storybookItem.createTemplate<IProgressBarProps>(
  {currentValue: 64, maxValue: 150, fillColor: 'success'}
);

export const WithPrefixIndicator = storybookItem.createTemplate<IProgressBarProps>(
  {currentValue: 29, maxValue: 150, showIndicatorAt: 'start'}
);

export const WithSufixIndicator = storybookItem.createTemplate<IProgressBarProps>(
  {currentValue: 87, maxValue: 150, showIndicatorAt: 'end'}
);