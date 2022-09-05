import { useState, useEffect } from "react";
import { EIcon } from "../../typescript/enums/Icon.enum";
import { IHasUuid } from "../../typescript/interfaces/HasUuid.interface";
import { Icon } from "../atoms/Icon";
import { LoopBlock } from "../atoms/LoopBlock";
import { ShowBlock } from "../atoms/ShowBlock";

export interface IAccordionProps {
	items: IAccordionItemProps[];
	multiExpand?: boolean;
}

export const Accordion = (props: IAccordionProps) => {
	return (
		<div className="accordion">
			<LoopBlock list={props.items} Component={AccordionItem}/>
		</div>
	);
}

/********************************************************
 * Accordion Item
 ********************************************************/
interface IAccordionItemProps extends IHasUuid {
	title: JSX.Element | string;
	expanded?: boolean;
	content: JSX.Element;
}

const AccordionItem = (props: IAccordionItemProps) => {
	const [isExpanded, setIsExpanded] = useState(props.expanded);

	const handleExpand = () => {
		setIsExpanded(!isExpanded);
	}

	return (
		<div className={
			`accordion__item ${isExpanded ? 'accordion__item--expanded' : ''}`
		}>
			<div className="accordion__item-header" onClick={handleExpand}>
				<div className="accordion__item-title">
					<span>{props.title}</span>
					<ShowBlock if={!isExpanded} Component={
						<Icon icon={EIcon.ARROW_DOWN} css="w-8" />
					}/>
					<ShowBlock if={!!isExpanded} Component={
						<Icon icon={EIcon.ARROW_UP} css="w-8 accordion__item-icon" />
					}/>
				</div>
			</div>
			<div className="accordion__item-content">
				{props.content}
			</div>
		</div>
	);
}