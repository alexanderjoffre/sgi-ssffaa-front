export interface ICardProps {
	children: JSX.Element;
	rounded?: boolean
}

export const Card = (props: ICardProps) => (
	<div className={`card ${props.rounded ? 'card--rounded' : ''}`}>
		{props.children}
	</div>
);