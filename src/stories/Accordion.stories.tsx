import { Card } from '../components/atoms/Card';
import { Icon } from '../components/atoms/Icon';
import { Accordion, IAccordionProps } from '../components/molecules/Accordion';
import { StoryBookItem } from '../helpers/StoryBookItem.helper';
import { EIcon } from '../typescript/enums/Icon.enum';

const storybookItem = new StoryBookItem(Accordion);

export default storybookItem.createMetadata( 
  'molecules/Accordion', 
  'Create a list of items that can be shown individually by clicking an item\'s header',
  { }
);

export const DefaultStyle = storybookItem.createTemplate<IAccordionProps>({
  items: [
    {
      uuid: 'item-1',
      title: 'This is Item #1',
      content: <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Pariatur ducimus quas ullam!</p>
    },
    {
      uuid: 'item-2',
      title: 'This is Item #2',
      content: <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Pariatur ducimus quas ullam!</p>
    },
  ]
});

export const CustomHeaderAndContent = storybookItem.createTemplate<IAccordionProps>({
  items: [
    {
      uuid: 'item-1',
      expanded: true,
      title: (() => (
        <div className='flex-center-start gap-3'>
          <Icon icon={EIcon.CHECK} css="w-8 text-success" />
          <div>
            <h4>Step 1</h4>
            <p className='text-success text-sm mt-1'><strong>Completed</strong></p>
          </div>
        </div>
      ))(),
      content: (() => (
        <Card type='info'>
          <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur animi eum repudiandae voluptatibus amet ducimus esse reprehenderit assumenda nisi sit sed modi eos quisquam hic, reiciendis molestiae enim, soluta doloremque!
          </p>
        </Card>
      ))()
    },
    {
      uuid: 'item-2',
      title: (() => (
        <div className='flex-center-start gap-3'>
          <Icon icon={EIcon.DANGER} css="w-8 text-danger" />
          <div>
            <h4>Step 2</h4>
            <p className='text-danger text-sm mt-1'><strong>Pending</strong></p>
          </div>
        </div>
      ))(),
      content: (() => (
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Pariatur ducimus quas ullam!</p>
      ))()
    },
  ]
});