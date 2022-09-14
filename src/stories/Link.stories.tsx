import { Link, ILinkProps } from '../components/atoms/Link';
import { RouteHandler } from '../handlers/Route.handler';
import { StoryBookItem } from '../helpers/StoryBookItem.helper';
import { AppRoutes } from '../routes/App.routes';

const storybookItem = new StoryBookItem(Link);

export default storybookItem.createMetadata( 
  'atoms/Link', 
  'Component that let\s navigate to internal or external URLs',
  { }
);

export const PlainText = storybookItem.createTemplate<ILinkProps>({
	route: new RouteHandler(AppRoutes.index),
	children: <p>This is a plain-text link</p>
});

export const OpenNewTab = storybookItem.createTemplate<ILinkProps>({
	route: new RouteHandler(AppRoutes.index),
	children: <p>This is a plain-text link</p>,
	openNewTab: true
});

export const PlainTextWithParams = storybookItem.createTemplate<ILinkProps>({
	route: new RouteHandler(AppRoutes.routeWithParams, { categoryId: 'this-is-param-id' }),
	children: <p>This is a plain-text link with params</p>
});