import { Badge, IBadgeProps } from '../components/atoms/Badge';
import { StoryBookItem } from '../helpers/StoryBookItem.helper';

const storybookItem = new StoryBookItem(Badge);
const Children = ({type}: {type: 'info' | 'success' | 'warning' | 'danger'}) => (
  <p>
    This is an Badge type <strong>{type}</strong>
  </p>
);

export default storybookItem.createMetadata( 
  'atoms/Badge', 
  'Shows a number indicator',
  { }
);

export const Primary = storybookItem.createTemplate<IBadgeProps>(
  { text: 1, type: 'primary' }
);

export const Info = storybookItem.createTemplate<IBadgeProps>(
  { text: 12, type: 'info' }
);

export const Success = storybookItem.createTemplate<IBadgeProps>(
  { text: 123, type: 'success' }
);

export const Warning = storybookItem.createTemplate<IBadgeProps>(
  { text: 1234, type: 'warning' }
);

export const Danger = storybookItem.createTemplate<IBadgeProps>(
  { text: 12345, type: 'danger' }
);