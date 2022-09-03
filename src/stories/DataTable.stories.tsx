import { DataTable, IDataTableProps } from '../components/molecules/DataTable';
import { StoryBookItem } from '../helpers/StoryBookItem.helper';

const storybookItem = new StoryBookItem(DataTable);

export default storybookItem.createMetadata( 
  'molecules/DataTable', 
  'Table to perform actions over a data set',
  { }
);

const data = [
  { uuid: 'data-1', name: 'Alex', age: 30, gender: 'male' },
  { uuid: 'data-2', name: 'Daryl', age: 5, gender: 'male' },
  { uuid: 'data-3', name: 'Yesy', age: 26, gender: 'female' },
];

export const RawData = storybookItem.createTemplate<IDataTableProps>({
  columns: [
    { uuid: 'name', attribute: 'name' },
    { uuid: 'age', attribute: 'age' },
    { uuid: 'gender', attribute: 'gender' },
  ],
  data
});

export const CustomColumnWidth = storybookItem.createTemplate<IDataTableProps>({
  columns: [
    { uuid: 'name', attribute: 'name', columnWidth: 'minmax(100px, 20%)' },
    { uuid: 'age', attribute: 'age' },
    { uuid: 'gender', attribute: 'gender' },
  ],
  data
});

export const RenamingColumns = storybookItem.createTemplate<IDataTableProps>({
  columns: [
    { uuid: 'name', attribute: 'name', title: 'Name' },
    { uuid: 'age', attribute: 'age', title: 'Age' },
    { uuid: 'gender', attribute: 'gender', title: 'Gender (male/female)' },
  ],
  data
});