import { DataTable, IDataTableProps } from '../components/molecules/DataTable';
import { StoryBookItem } from '../helpers/StoryBookItem.helper';
import { IHasUuid } from '../typescript/interfaces/HasUuid.interface';

const storybookItem = new StoryBookItem(DataTable);

const datasetName = 'dataset-storybook'

export default storybookItem.createMetadata( 
  'molecules/Data Table', 
  'Table to perform actions over a data set. 10 records are displayed per page by default',
  { }
);

const data = [
  { uuid: 'data-1', name: 'Alex', age: 30, gender: 'male' },
  { uuid: 'data-2', name: 'Daryl', age: 5, gender: 'male' },
  { uuid: 'data-3', name: 'Yesy', age: 26, gender: 'female' },
  { uuid: 'data-4', name: 'Alex', age: 30, gender: 'male' },
  { uuid: 'data-5', name: 'Daryl', age: 5, gender: 'male' },
  { uuid: 'data-6', name: 'Yesy', age: 26, gender: 'female' },
  { uuid: 'data-7', name: 'Alex', age: 30, gender: 'male' },
  { uuid: 'data-8', name: 'Daryl', age: 5, gender: 'male' },
  { uuid: 'data-9', name: 'Yesy', age: 26, gender: 'female' },
  { uuid: 'data-10', name: 'Alex', age: 30, gender: 'male' },
  { uuid: 'data-11', name: 'Daryl', age: 5, gender: 'male' },
  { uuid: 'data-12', name: 'Yesy', age: 26, gender: 'female' },
];

export const RawData = storybookItem.createTemplate<IDataTableProps>({
  data,
  datasetName,
  columns: [
    { uuid: 'name', attribute: 'name' },
    { uuid: 'age', attribute: 'age' },
    { uuid: 'gender', attribute: 'gender' },
  ],
});

export const WithTitle = storybookItem.createTemplate<IDataTableProps>({
  data,
  datasetName,
  title: 'This is the title of the table',
  columns: [
    { uuid: 'name', attribute: 'name' },
    { uuid: 'age', attribute: 'age' },
    { uuid: 'gender', attribute: 'gender' },
  ],
});

export const CustomRecordsPerPage = storybookItem.createTemplate<IDataTableProps>({
  data,
  datasetName,
  recordsPerPage: 5,
  columns: [
    { uuid: 'name', attribute: 'name' },
    { uuid: 'age', attribute: 'age' },
    { uuid: 'gender', attribute: 'gender' },
  ],
});

export const CustomColumnWidth = storybookItem.createTemplate<IDataTableProps>({
  data,
  datasetName,
  columns: [
    { uuid: 'name', attribute: 'name', columnWidth: 'minmax(100px, 20%)' },
    { uuid: 'age', attribute: 'age' },
    { uuid: 'gender', attribute: 'gender' },
  ],
});

export const CustomColumnNames = storybookItem.createTemplate<IDataTableProps>({
  data,
  datasetName,
  columns: [
    { uuid: 'name', attribute: 'name', title: 'Name' },
    { uuid: 'age', attribute: 'age', title: 'Age' },
    { uuid: 'gender', attribute: 'gender', title: 'Gender (male/female)' },
  ],
});

export const ActionButtons = storybookItem.createTemplate<IDataTableProps>({
  data,
  datasetName,
  columns: [
    { uuid: 'name', attribute: 'name', title: 'Name' },
    { uuid: 'age', attribute: 'age', title: 'Age' },
    { uuid: 'gender', attribute: 'gender', title: 'Gender (male/female)' },
  ],
  actionView: (record: IHasUuid) => alert(`You clicked view in uuid: ${record.uuid}`),
  actionEdit: (record: IHasUuid) => alert(`You clicked edit in uuid: ${record.uuid}`),
  actionDelete: (record: IHasUuid) => alert(`You clicked delete in uuid: ${record.uuid}`),
});