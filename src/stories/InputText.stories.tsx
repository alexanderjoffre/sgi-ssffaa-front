import { InputText, IInputText } from '../components/molecules/InputText';
import { EIcon } from '../typescript/enums/Icon.enum';
import { StoryBookItem } from '../helpers/StoryBookItem.helper';

const inputSettings = { value: '', placeholder: 'Quick search'};
const storybookItem = new StoryBookItem(InputText);

export default storybookItem.createMetadata( 
  'molecules/InputText', 
  'Input for typing strings and numbers',
  {
    argTypes: {
      prefix: StoryBookItem.makeSelectControl(EIcon),
      sufix: StoryBookItem.makeSelectControl(EIcon),
    }
  }
);

export const WithValue = storybookItem.createTemplate<IInputText>(
  { value: 'This is the input value', sufix: EIcon.SEARCH }
);

export const WithLabel = storybookItem.createTemplate<IInputText>(
  { ...inputSettings, label: 'Search' }
);

export const WithBelowMessage = storybookItem.createTemplate<IInputText>(
  { value: 'user@domain.com', belowText: 'User already registered', label: 'User' }
);

export const WithBelowSuccessMessage = storybookItem.createTemplate<IInputText>(
  { value: 'user@domain.com', belowText: 'User already registered', label: 'User', belowTextType: 'success' }
);

export const WithBelowErrorMessage = storybookItem.createTemplate<IInputText>(
  { value: 'user@domain.com', belowText: 'User already registered', label: 'User', belowTextType: 'danger' }
);

export const WithSuffixIcon = storybookItem.createTemplate<IInputText>(
  { ...inputSettings, sufix: EIcon.SEARCH }
);
