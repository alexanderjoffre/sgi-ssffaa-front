import { FeelingRatingInput, IFeelingRatingInputProps } from '../components/molecules/FeelingRatingInput';
import { StoryBookItem } from '../helpers/StoryBookItem.helper';

const storybookItem = new StoryBookItem(FeelingRatingInput);
const onChange = (value: any) => { alert(`value ${value} selected!!`) }

export default storybookItem.createMetadata( 
  'molecules/Rating Input Feeling', 
  'Let\'s interact to give feedback based on feeling',
  { }
);

export const With3Faces = storybookItem.createTemplate<IFeelingRatingInputProps>(
  { faces: 3, onChange }
);

export const With5Faces = storybookItem.createTemplate<IFeelingRatingInputProps>(
  { faces: 5, onChange }
);

export const WithCurrentValue = storybookItem.createTemplate<IFeelingRatingInputProps>(
  { faces: 5, onChange, showIndicator: true }
);