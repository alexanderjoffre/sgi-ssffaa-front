import { useContext, useEffect, useState } from "react";
import { EIcon } from "../../typescript/enums/Icon.enum";
import { IHasUuid } from "../../typescript/interfaces/HasUuid.interface";
import { Icon } from "../atoms/Icon";
import { LoopBlock } from "../atoms/LoopBlock";
import { createContext } from "react";

const PaginationContext = createContext({
	currentPage: 0,
	setCurrentPage: (page: number) => {}
});

const generatePages = (pageCount: number, currentPage: number): IHasUuid[] => {
	return Array.from(
		Array(pageCount).keys()
	).map((page: number) => ({
		uuid: `page-${page}`,
		value: page + 1,
		isSelected: page === currentPage
	}));
}

export interface IPaginationProps {
	pageCount: number;
	onChange: (page: number) => void;
}

export const Pagination = (props: IPaginationProps) => {
	const [currentPage, setCurrentPage] = useState<number>(0);

	const context = { 
		currentPage, 
		setCurrentPage: (page: number) => setCurrentPage(page) 
	};

	const pages: IHasUuid[] = generatePages(props.pageCount, currentPage);

	const prevPag = () => {
		if ( currentPage >= 1 ) { setCurrentPage(currentPage - 1) }
	};

	const nextPag = () => {
		if ( currentPage <= props.pageCount ) { setCurrentPage(currentPage + 1) }
	};

	useEffect(() => {
		props.onChange(currentPage + 1);
	}, [currentPage]);

	return (
		<PaginationContext.Provider value={context}>
			<div className="pagination">
				<div className="pagination__item" onClick={prevPag}>
					<Icon icon={EIcon.ARROW_LEFT}/>
				</div>

				<LoopBlock list={pages} Component={PaginationItem} />

				<div className="pagination__item" onClick={nextPag}>
					<Icon icon={EIcon.ARROW_RIGHT}/>
				</div>
			</div>
		</PaginationContext.Provider>
	);
}

// Micro component Pagination Item
interface IPaginationItemProps {
	value: number,
	isSelected: boolean;
}

const PaginationItem = (props: IPaginationItemProps) => {
	const { setCurrentPage } = useContext(PaginationContext);

	return (
		<div className={
			`pagination__item ${props.isSelected ? 'pagination__item--active': ''}`
		}
		onClick={() => setCurrentPage(props.value - 1)}
		>
			{props.value}
		</div>
	);
}