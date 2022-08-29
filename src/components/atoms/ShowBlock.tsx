interface IShowBlockProps {

	// If true, componen will render
	if: boolean;

	// Component to be render
	Component: (props: any) => JSX.Element;
}

export const ShowBlock = (props: IShowBlockProps): JSX.Element => (
	props.if ? <props.Component {...props} /> : <></>
)