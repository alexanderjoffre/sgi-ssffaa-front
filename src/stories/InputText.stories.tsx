import { InputText, IInputText } from '../components/molecules/InputText';
import { EIcon } from '../typescript/enums/Icon.enum';
import { StoryBookItem } from '../helpers/StoryBookItem.helper';

const inputSettings = { value: 'user@domain.com', placeholder: 'Quick search'};
const storybookItem = new StoryBookItem(InputText);

export default storybookItem.createMetadata( 
  'molecules/Input Text', 
  'Input for typing texts and password',
  {
    argTypes: {
      prefix: StoryBookItem.makeSelectControl(EIcon),
      sufix: StoryBookItem.makeSelectControl(EIcon),
    }
  }
);

export const WithValue = storybookItem.createTemplate<IInputText>(
  { ...inputSettings, type: 'text', sufix: EIcon.SEARCH }
);

export const Password = storybookItem.createTemplate<IInputText>(
  { ...inputSettings, type: 'password', label: 'Password' }
);

export const WithLabel = storybookItem.createTemplate<IInputText>(
  { ...inputSettings, type: 'text', label: 'Search' }
);

export const WithBelowMessage = storybookItem.createTemplate<IInputText>(
  { ...inputSettings, type: 'text', belowText: 'User already registered', label: 'User' }
);

export const WithBelowSuccessMessage = storybookItem.createTemplate<IInputText>(
  { ...inputSettings, type: 'text', belowText: 'User already registered', label: 'User', belowTextType: 'success' }
);

export const WithBelowErrorMessage = storybookItem.createTemplate<IInputText>(
  { ...inputSettings, type: 'text', belowText: 'User already registered', label: 'User', belowTextType: 'danger' }
);

export const WithSuffixIcon = storybookItem.createTemplate<IInputText>(
  { ...inputSettings, type: 'text', sufix: EIcon.SEARCH }
);
