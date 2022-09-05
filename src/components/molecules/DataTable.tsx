import { useEffect } from "react";
import { IHasUuid } from "../../typescript/interfaces/HasUuid.interface"
import { Icon } from "../atoms/Icon";
import { LoopBlock } from "../atoms/LoopBlock";
import { EIcon } from '../../typescript/enums/Icon.enum'
import { createContext, useContext, useState } from "react";
import { InputText } from "./InputText";
import { Pagination } from "./Pagination";
import { useDebounce } from "../../hooks/debounce.hooks";
import { ActionButton } from "./ActionButton";
import { ExcelAdapter } from "../../adapters/Excel.adapter";
import { IExcelSheet } from "../../typescript/interfaces/ExcelFile.interface";
import { FileHandler } from "../../handlers/File.handler";
import { ArrayHelper } from "../../helpers/Array.helper";
import { ShowBlock } from "../atoms/ShowBlock";

interface IDataTableColumn extends IHasUuid {
	attribute: string;
	title?: string;
	columnWidth?: string;
	dataAlign?: 'center' | 'end';
	format?: (value: any) => string;
}

export interface IDataTableProps {
	datasetName: string;
	columns: IDataTableColumn[];
	data: IHasUuid[];
	recordsPerPage?: number;
	actionView?: (record: IHasUuid) => void;
	actionEdit?: (record: IHasUuid) => void;
	actionDelete?: (record: IHasUuid) => void;
}

const TableContext = createContext({
	data: [{ uuid: ''}],
	setData: (tableData: IHasUuid[]) => {}
});

const getColumnWidths = (columns: IDataTableColumn[]) => {
	const widths = columns.map( column => column.columnWidth ?? '1fr' );
	return widths.join(' ');
}

const downloadDataAsExcel = async (tableData: IDataTableProps) => {
	const sheet: IExcelSheet = {
		data: tableData.data,
		headers: tableData.columns.map(
			(column: IDataTableColumn) => column.title ?? column.attribute
		),
		name: tableData.datasetName,
	};

	const excel = new ExcelAdapter([sheet]);
	await FileHandler.download( excel, `${tableData.datasetName}.xlsx` );
}

export const DataTable = (props: IDataTableProps) => {
	const data: IHasUuid[] 											= props.data;
	const showActions: boolean									= !!props.actionDelete || !!props.actionEdit || !!props.actionView;
	const columnsWidth: string 									= getColumnWidths(props.columns) + (showActions ? ' 38px' : '');

	const [filter, setFilter] 									= useState<string>('');
	const debouncedFilter 											= useDebounce<string>(filter, 500);
	const [filteredData, setFilteredData] 			= useState<IHasUuid[]>(data);

	const [currentPageData, setCurrentPageData] = useState<IHasUuid[]>([]);
	const recordsPerPage 												= props.recordsPerPage ?? 10;	
	const pageCount 														= ArrayHelper.getPagesCount(filteredData, recordsPerPage);

	const context = { 
		data: filteredData, 
		setData: (tableData: IHasUuid[]): void => {
			setFilteredData([...tableData])
		}
	};

	const refreshData = (page: number) => {
		const pagedData = ArrayHelper.getPagedData(
			filteredData,
			recordsPerPage
		);

		setCurrentPageData( pagedData.get(page) ?? [] );
	}

	const onPageChange = (page: number) => {
		refreshData(page);
	}

	useEffect(() => {
		const results: IHasUuid[] = ArrayHelper.filterObjectArray(data, filter);
		setFilteredData(results);
	}, [debouncedFilter]);

	useEffect(() => refreshData(1), [filteredData]);

	return (
		<TableContext.Provider value={context}>
			<div className="data-table">
				<div className="data-table__actions">
					<InputText type="text"
					value={filter}
					placeholder="Quick filters"
					sufix={EIcon.SEARCH}
					onChange={(event) => setFilter(event.target.value)}
					/>

					<ActionButton icon={EIcon.EXCEL} hoverColor="success"
						onClick={() => { downloadDataAsExcel({...props, data: filteredData}) }} 
					/>
				</div>

				<div className="data-table__heading grid"
				style={{ gridTemplateColumns: columnsWidth }}
				>
					<LoopBlock list={props.columns} Component={DataTableHeadingCell} />
				</div>
				<div>
					{currentPageData.map( (record: IHasUuid) => (
						<DataTableRow key={record.uuid} 
							record={record}
							tableProps={props} 
							columnsWidth={columnsWidth}
							showActions={showActions}
						/>
					))}
				</div>

				<div className="data-table__table-pages">
					<Pagination pageCount={pageCount} onChange={onPageChange} />
				</div>
			</div>
		</TableContext.Provider>
	);
};

/***************************************************************
 * HEADING CELLS
 ***************************************************************/

const DataTableHeadingCell = (column: IDataTableColumn) => {
	const { data, setData } = useContext(TableContext);
	const [ order, setOrder ] = useState<string>('none');

	const sortData = (attribute: string) => {
		switch(order) {
			case 'asc':
				setData(ArrayHelper.sortByColumnAsc(data, attribute));
				break;
			case 'desc':
				setData(ArrayHelper.sortByColumnDesc(data, attribute));
				break;
			default:
				break;
		}
	}

	const toggleSort = () => {
		switch(order) {
			case 'none':
				setOrder('asc');
				break;
			case 'asc':
				setOrder('desc');
				break;
			case 'desc':
				setOrder('none');
				break;
			default:
				break;
		}
	}

	useEffect(() => {
		sortData(column.attribute);
	}, [order]);

	return (
		<div className="data-table__heading-cell">
			<span>{column.title ?? column.attribute}</span>
			<div className="data-table__heading-sort" onClick={toggleSort}>
				<Icon icon={EIcon.SORT_ALPHABETHICAL} />
			</div>
		</div>
	);
}

/***************************************************************
 * CONTENT ROWS
 ***************************************************************/
interface IDataTableRowProps {
	record: IHasUuid;
	tableProps: IDataTableProps;
	columnsWidth: string;
	showActions: boolean;
}

const DataTableRow = (props: IDataTableRowProps) => {
	const [isActionsVisible, setIsActionsVisible] = useState<boolean>(false);

	const toggleActions = () => {
		setIsActionsVisible(!isActionsVisible)
	}
	
	return (
		<div key={props.record.uuid} className="data-table__row">				
			<div className="grid" style={{ gridTemplateColumns: props.columnsWidth }}>
				{props.tableProps.columns.map( (column: IDataTableColumn) => (
					<DataTableRowCell key={column.uuid} column={column} value={props.record[column.attribute]} />
				))}

				<ShowBlock if={props.showActions} Component={
					<div className="flex-center-center">
						<ActionButton icon={EIcon.CONTEXT_MENU} onClick={toggleActions} />
					</div>
				} />
			</div>
			<ShowBlock if={isActionsVisible} Component={
				<div className="data-table__row-actions">
					<ShowBlock if={!!props.tableProps.actionView} Component={
						<ActionButton icon={EIcon.EYE} onClick={ 
							() => {props.tableProps.actionView && props.tableProps.actionView(props.record)}
						} />
					} />
					
					<ShowBlock if={!!props.tableProps.actionEdit} Component={
						<ActionButton icon={EIcon.EDIT} onClick={ 
							() => {props.tableProps.actionEdit && props.tableProps.actionEdit(props.record)}
						} />
					} />

					<ShowBlock if={!!props.tableProps.actionDelete} Component={
						<ActionButton icon={EIcon.DELETE} hoverColor="danger" onClick={ 
							() => {props.tableProps.actionDelete && props.tableProps.actionDelete(props.record)}
						} />
					} />

					<ActionButton icon={EIcon.CLOSE} onClick={toggleActions} />
				</div>
			} />
		</div>
	);
}

const DataTableRowCell = (props: {column: IDataTableColumn, value: any}) => {
	return(
		<div className={`data-table__cell flex-center-${props.column.dataAlign ?? 'start'}`}>
			{
				props.column.format 
				? props.column.format(props.value)
				: props.value
			}
		</div>
	);
}