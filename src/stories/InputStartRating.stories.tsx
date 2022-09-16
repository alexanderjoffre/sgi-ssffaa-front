import { InputStarRating, IInputStarRatingProps } from '../components/molecules/InputStarRating';
import { StoryBookItem } from '../helpers/StoryBookItem.helper';

const storybookItem = new StoryBookItem(InputStarRating);
const onChange = (value: number) => { alert(`value ${value} selected!!`) }

export default storybookItem.createMetadata( 
  'molecules/Input Rating Star', 
  'Let\'s interact to give feedback based on stars',
  { }
);

export const With3Stars = storybookItem.createTemplate<IInputStarRatingProps>(
  { maxRange: 3, onChange }
);

export const With5Stars = storybookItem.createTemplate<IInputStarRatingProps>(
  { maxRange: 5, onChange }
);

export const WithCurrentValue = storybookItem.createTemplate<IInputStarRatingProps>(
  { maxRange: 5, onChange, showIndicator: true }
);