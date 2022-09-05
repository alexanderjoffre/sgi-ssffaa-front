export interface IBadgeProps {
	text: string | number;
	type: 'primary' | 'info' | 'success' | 'warning' | 'danger';
}

export const Badge = (props: IBadgeProps) => (
	<div className={`badge badge--${props.type ?? 'primary'}`}>
		{props.text}
	</div>
);