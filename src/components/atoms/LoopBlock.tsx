import { IHasUuid } from "../../typescript/interfaces/HasUuid.interface";

interface ILoopBlockProps {

	// this array will be looped around to render
	list: IHasUuid[];

	// Component to be render
	Component: (data: any) => JSX.Element;
}

export const LoopBlock = ({list, Component}: ILoopBlockProps): JSX.Element => (
	<>
		{ list.map(item => <Component key={item.uuid} {...item}/>) }
	</>
);