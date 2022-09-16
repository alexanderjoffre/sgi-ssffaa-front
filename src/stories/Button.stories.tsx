import { Button, IButtonProps } from '../components/molecules/Button';
import { EIcon } from '../typescript/enums/Icon.enum';
import { StoryBookItem } from '../helpers/StoryBookItem.helper';

const buttonSettings = {text: 'Click Me', onClick: () => {alert('Clicked!')}};

const storybookItem = new StoryBookItem(Button);

export default storybookItem.createMetadata( 
  'molecules/Button', 
  'Button component to make user interactions',
  {
    argTypes: {
      prefix: StoryBookItem.makeSelectControl(EIcon),
      sufix: StoryBookItem.makeSelectControl(EIcon),
    }
  }
);

export const Primary = storybookItem.createTemplate<IButtonProps>(
  { ...buttonSettings, type: 'primary' }
);

export const Succes = storybookItem.createTemplate<IButtonProps>(
  { ...buttonSettings, type: 'success' }
);

export const Warning = storybookItem.createTemplate<IButtonProps>(
  { ...buttonSettings, type: 'warning' }
);

export const Danger = storybookItem.createTemplate<IButtonProps>(
  { ...buttonSettings, type: 'danger' }
);

export const DangerWithPrefix = storybookItem.createTemplate<IButtonProps>(
  { ...buttonSettings, type: 'danger', prefix: EIcon.DELETE }
);

export const Link = storybookItem.createTemplate<IButtonProps>(
  { ...buttonSettings, type: 'link' }
);

export const LinkWithPrefix = storybookItem.createTemplate<IButtonProps>(
  { ...buttonSettings, type: 'link', prefix: EIcon.CLOSE }
);

export const LinkWithSufix = storybookItem.createTemplate<IButtonProps>(
  { ...buttonSettings, type: 'link', sufix: EIcon.CHECK }
);