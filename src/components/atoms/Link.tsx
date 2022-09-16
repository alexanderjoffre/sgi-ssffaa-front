import NextLink from 'next/link';
import { RouteHandler } from '../../handlers/Route.handler';

export interface ILinkProps {
	route: RouteHandler;
	children: JSX.Element;
	openNewTab?: boolean;
}

export const Link = ({ route, children, openNewTab }: ILinkProps) => (
	<NextLink href={route.makeHref()}>
		<a className='link' target={openNewTab ? '_blank' : '_self'}>
			{children}
		</a>
	</NextLink>
);