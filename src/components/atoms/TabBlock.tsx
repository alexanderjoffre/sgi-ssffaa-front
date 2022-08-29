interface ITabBlockProps {

	// current step to show
	step: number;

	// component list to be switched
	components: JSX.Element[]
}

export const TabBlock = ({ step, components }: ITabBlockProps): JSX.Element => {
	return components[step - 1];
}