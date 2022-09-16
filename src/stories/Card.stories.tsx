import { Card, ICardProps } from '../components/atoms/Card';
import { StoryBookItem } from '../helpers/StoryBookItem.helper';

const storybookItem = new StoryBookItem(Card);

export default storybookItem.createMetadata( 
  'atoms/Card', 
  'Container for displaying elements inside a customizable element',
  { }
);

export const Normal = storybookItem.createTemplate<ICardProps>(
  { children: <p>This is a card</p> }
);

export const WithShadow = storybookItem.createTemplate<ICardProps>(
  { children: <p>This is a card</p>, shadow: true }
);

export const WithRoundedCornersAndInfoColor = storybookItem.createTemplate<ICardProps>(
  { children: <p>This is a card with rounded corners</p>, rounded: true, type: 'info' }
);

export const WithRoundedCornersAndSucessColor = storybookItem.createTemplate<ICardProps>(
  { children: <p>This is a card with rounded corners</p>, rounded: true, type: 'success' }
);

export const WithRoundedCornersAndWarningColor = storybookItem.createTemplate<ICardProps>(
  { children: <p>This is a card with rounded corners</p>, rounded: true, type: 'warning' }
);

export const WithRoundedCornersAndDangerColor = storybookItem.createTemplate<ICardProps>(
  { children: <p>This is a card with rounded corners</p>, rounded: true, type: 'danger' }
);