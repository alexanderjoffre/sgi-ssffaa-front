import { DateAdapter } from '../adapters/Date.adapter';
import { InputCalendar, IInputCalendarProps } from '../components/molecules/InputCalendar/InputCalendar';
import { StoryBookItem } from '../helpers/StoryBookItem.helper';
import { EDatePart } from '../typescript/enums/DateFormat.enum';
import { EDateInterval } from '../typescript/enums/DateInterval.enum';

const defaultSettings = { onChange: (date: string) => { alert(`Clicked ${date}!!!!`) } };
const dateAdapter = DateAdapter.getAdapter();

const storybookItem = new StoryBookItem(InputCalendar);

export default storybookItem.createMetadata( 
  'molecules/Input Calendar',
  'Calendar component to make user interactions',
  { }
);

export const DefaultSetting = storybookItem.createTemplate<IInputCalendarProps>(
  { ...defaultSettings }
);

export const DisablePastDates = storybookItem.createTemplate<IInputCalendarProps>(
  { ...defaultSettings, minRange: dateAdapter.now(EDatePart.DATE) }
);

export const SelectableDateRange = storybookItem.createTemplate<IInputCalendarProps>(
  { 
    ...defaultSettings, 
    minRange: dateAdapter.now(EDatePart.DATE), 
    maxRange: dateAdapter.add(dateAdapter.now(EDatePart.DATE), 3, EDateInterval.DAY)
  }
);

export const SelectableWorkingDays = storybookItem.createTemplate<IInputCalendarProps>(
  { ...defaultSettings, onlyWorkingDays: true }
);