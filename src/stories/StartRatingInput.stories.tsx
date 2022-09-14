import { StarRatingInput, IStarRatingInputProps } from '../components/molecules/StarRatingInput';
import { StoryBookItem } from '../helpers/StoryBookItem.helper';

const storybookItem = new StoryBookItem(StarRatingInput);
const onChange = (value: number) => { alert(`value ${value} selected!!`) }

export default storybookItem.createMetadata( 
  'molecules/Rating Input Star', 
  'Let\'s interact to give feedback based on stars',
  { }
);

export const With3Stars = storybookItem.createTemplate<IStarRatingInputProps>(
  { maxRange: 3, onChange }
);

export const With5Stars = storybookItem.createTemplate<IStarRatingInputProps>(
  { maxRange: 5, onChange }
);

export const WithCurrentValue = storybookItem.createTemplate<IStarRatingInputProps>(
  { maxRange: 5, onChange, showIndicator: true }
);