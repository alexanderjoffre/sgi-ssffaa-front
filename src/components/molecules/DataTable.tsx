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
import { FileDownloadHandler } from "../../handlers/FileDownload.handler";
import { ArrayHelper } from "../../helpers/Array.helper";

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
	actionView?: () => void;
	actionEdit?: () => void;
	actionDelete?: () => void;
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
	await FileDownloadHandler.download( excel, `${tableData.datasetName}.xlsx` );
}

export const DataTable = (props: IDataTableProps) => {
	const data: IHasUuid[] 											= props.data;
	
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
		const pagedData = ArrayHelper.getPagedData<IHasUuid>(
			filteredData,
			recordsPerPage
		);

		setCurrentPageData( pagedData.get(page) ?? [] );
	}

	const onPageChange = (page: number) => {
		refreshData(page);
	}

	useEffect(() => {
		const results: IHasUuid[] = data.filter( ({uuid, ...recordWithoutUuid}) => {
			const dataValues: string = Object.values(recordWithoutUuid).join(',');

			const filtrosInput: string[] = filter.split(',');
			
			return filtrosInput.every(
				(filter: string) => dataValues.match(new RegExp(filter.trim(), 'ig'))
			);
		})

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

					<ActionButton 
						icon={EIcon.EXCEL} 
						onClick={() => { downloadDataAsExcel({...props, data: filteredData}) }} 
					/>
				</div>

				<div className="data-table__heading grid"
				style={{ gridTemplateColumns: getColumnWidths(props.columns) }}
				>
					<LoopBlock list={props.columns} Component={DataTableHeadingCell} />
				</div>
				<div>
					<DataTableRows columns={props.columns} data={currentPageData} />
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

const sortByColumnAsc = (data: IHasUuid[], attribute: string) => {
	data.sort(
		( a: IHasUuid, b: IHasUuid ) => {
			if ( a[attribute] < b[attribute] ) { return -1; }
			if ( a[attribute] > b[attribute] ) { return 1; }
			return 0;
		}
	);
	return data;
}

const sortByColumnDesc = (data: IHasUuid[], attribute: string) => {
	data.sort(
		( a: IHasUuid, b: IHasUuid ) => {
			if ( a[attribute] > b[attribute] ) { return -1; }
			if ( a[attribute] < b[attribute] ) { return 1; }
			return 0;
		}
	);
	return data;
}

const DataTableHeadingCell = (column: IDataTableColumn) => {
	const { data, setData } = useContext(TableContext);
	const [ order, setOrder ] = useState<string>('none');

	const sortData = (attribute: string) => {
		switch(order) {
			case 'asc':
				setData(sortByColumnAsc(data, attribute));
				break;
			case 'desc':
				setData(sortByColumnDesc(data, attribute));
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

const DataTableRows = (props: Omit<IDataTableProps, 'datasetName'>) => {
	return (
		<>
		{props.data.map( (record: IHasUuid) => (
			<div key={record.uuid} className="data-table__row grid"
			style={{ gridTemplateColumns: getColumnWidths(props.columns) }}
			>
				{props.columns.map( (column: IDataTableColumn) => (
					<DataTableRowCell key={column.uuid} column={column} value={record[column.attribute]} />
				))}
			</div>
		))}
		</>
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