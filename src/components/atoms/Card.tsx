export interface ICardProps {
	children: JSX.Element;
	rounded?: boolean;
	shadow?: boolean;
	type?: 'info' | 'success' | 'warning' | 'danger';
}

export const Card = (props: ICardProps) => (
	<div className={` card 
		${props.rounded ? 'card--rounded' : ''}
		${props.shadow ? 'card--shadow' : ''}
		${props.type ? `card--${props.type}` : ''}
	`}>
		{props.children}
	</div>
);