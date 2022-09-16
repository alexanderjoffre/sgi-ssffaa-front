import { InputFeelingRating, IInputFeelingRatingProps } from '../components/molecules/InputFeelingRating';
import { StoryBookItem } from '../helpers/StoryBookItem.helper';

const storybookItem = new StoryBookItem(InputFeelingRating);
const onChange = (value: any) => { alert(`value ${value} selected!!`) }

export default storybookItem.createMetadata( 
  'molecules/Input Rating Feeling', 
  'Let\'s interact to give feedback based on feeling',
  { }
);

export const With3Faces = storybookItem.createTemplate<IInputFeelingRatingProps>(
  { faces: 3, onChange }
);

export const With5Faces = storybookItem.createTemplate<IInputFeelingRatingProps>(
  { faces: 5, onChange }
);

export const WithCurrentValue = storybookItem.createTemplate<IInputFeelingRatingProps>(
  { faces: 5, onChange, showIndicator: true }
);