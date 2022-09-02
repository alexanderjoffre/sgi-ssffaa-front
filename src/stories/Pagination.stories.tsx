import { Pagination, IPaginationProps } from '../components/molecules/Pagination';
import { StoryBookItem } from '../helpers/StoryBookItem.helper';

const storybookItem = new StoryBookItem(Pagination);

export default storybookItem.createMetadata( 
  'molecules/Pagination', 
  'Paginator with max value count and prev/next callbacks',
  { }
);

export const WithCallback = storybookItem.createTemplate<IPaginationProps>({
  pageCount: 10,
  onChange(page: number) {
    alert(`Callback triggered for page number ${page}`)
  },
});