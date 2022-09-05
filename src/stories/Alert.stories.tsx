import { Alert, IAlertProps } from '../components/molecules/Alert';
import { EIcon } from '../typescript/enums/Icon.enum';
import { StoryBookItem } from '../helpers/StoryBookItem.helper';

const storybookItem = new StoryBookItem(Alert);
const Children = ({type}: {type: 'info' | 'success' | 'warning' | 'danger'}) => (
  <p>
    This is an alert type <strong>{type}</strong>
  </p>
);

export default storybookItem.createMetadata( 
  'molecules/Alert', 
  'Shows a massage to user',
  { }
);

export const Info = storybookItem.createTemplate<IAlertProps>(
  { children: <Children type='info' />, type: 'info' }
);

export const Success = storybookItem.createTemplate<IAlertProps>(
  { children: <Children type='success' />, type: 'success' }
);

export const Warning = storybookItem.createTemplate<IAlertProps>(
  { children: <Children type='warning' />, type: 'warning' }
);

export const Danger = storybookItem.createTemplate<IAlertProps>(
  { children: <Children type='danger' />, type: 'danger' }
);