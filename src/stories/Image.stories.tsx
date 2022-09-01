import { Image, IImageProps } from '../components/atoms/Image';
import { StoryBookItem } from '../helpers/StoryBookItem.helper';

const storybookItem = new StoryBookItem(Image);

export default storybookItem.createMetadata( 
  'atoms/Image', 
  'Displays an images with url given. It always is 100% of its container width, and adjust responsively',
  { }
);

export const Normal = storybookItem.createTemplate<IImageProps>(
  { src: 'http://via.placeholder.com/300x200' }
);