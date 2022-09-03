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

export const WithRoundedCorners = storybookItem.createTemplate<ICardProps>(
  { children: <p>This is a card with rounded corners</p>, rounded: true }
);