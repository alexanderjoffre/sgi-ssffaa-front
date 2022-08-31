import { Icon, IIconProps } from '../components/atoms/Icon';
import { EIcon } from '../typescript/enums/Icon.enum';
import { StoryBookItem } from '../helpers/StoryBookItem.helper';

const css = 'w-20';
const storybookItem = new StoryBookItem(Icon);

export default storybookItem.createMetadata( 'atoms/Icon', {
  argTypes: {
    icon: StoryBookItem.makeSelectControl(EIcon)
  }
});

export const Account = storybookItem.createTemplate<IIconProps>({ css, icon: EIcon.ACCOUNT });
export const Close = storybookItem.createTemplate<IIconProps>({ css, icon: EIcon.CLOSE });
