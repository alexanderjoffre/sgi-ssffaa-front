import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Icon } from '../components/atoms/Icon';
import { EIcon } from '../typescript/enums/Icon.enum';
import { enumToStorybookSelectControl } from '../helpers/enum.helper';

export default {
  title: 'atoms/Icon',
  component: Icon,
  args: { 
    icon: EIcon.ACCOUNT 
  },
  argTypes: {
    icon: enumToStorybookSelectControl(EIcon)
  }
} as ComponentMeta<typeof Icon>;

const Template: ComponentStory<typeof Icon> = (args) => <Icon css='max-w-20' {...args} />;

export const Account = Template.bind({ icon: EIcon.ACCOUNT });