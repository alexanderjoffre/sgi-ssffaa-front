import { ActionButton, IActionButtonProps } from '../components/molecules/ActionButton';
import { EIcon } from '../typescript/enums/Icon.enum';
import { StoryBookItem } from '../helpers/StoryBookItem.helper';

const buttonSettings = {onClick: () => {alert('Clicked!')}};

const storybookItem = new StoryBookItem(ActionButton);

export default storybookItem.createMetadata( 
  'molecules/ActionButton', 
  'ActionButton component to make user interactions',
  {
    argTypes: {
      prefix: StoryBookItem.makeSelectControl(EIcon),
      sufix: StoryBookItem.makeSelectControl(EIcon),
    }
  }
);

export const Primary = storybookItem.createTemplate<IActionButtonProps>(
  { ...buttonSettings, icon: EIcon.ACCOUNT }
);