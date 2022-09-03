import { useEffect } from "react";
import { IHasUuid } from "../../typescript/interfaces/HasUuid.interface"
import { Icon } from "../atoms/Icon";
import { LoopBlock } from "../atoms/LoopBlock";
import { EIcon } from '../../typescript/enums/Icon.enum'
import { createContext, useContext, useState } from "react";
import { addColors } from "winston/lib/winston/config";

interface IDataTableColumn extends IHasUuid {
	attribute: string;
	title?: string;
	columnWidth?: string;
	dataAlign?: 'center' | 'end',
	format?: (value: any) => string;
}

export interface IDataTableProps {
	columns: IDataTableColumn[],
	data: IHasUuid[]
}

const TableContext = createContext({
	data: [{ uuid: ''}],
	setData: (tableData: IHasUuid[]) => {}
});

const getColumnWidths = (columns: IDataTableColumn[]) => {
	const widths = columns.map( column => column.columnWidth ?? '1fr' );
	return widths.join(' ');
}

export const DataTable = (props: IDataTableProps) => {
	const [data, setData] = useState<IHasUuid[]>(props.data);

	const context = { 
		data, 
		setData: (tableData: IHasUuid[]) => {
			setData([...tableData])
		}
	};

	return (
		<TableContext.Provider value={context}>
			<div className="data-table">
				<div className="data-table__heading grid"
				style={{ gridTemplateColumns: getColumnWidths(props.columns) }}
				>
					<LoopBlock list={props.columns} Component={DataTableHeadingCell} />
				</div>
				<div>
					<DataTableRows columns={props.columns} data={data} />
				</div>
			</div>
		</TableContext.Provider>
	)
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
			<div onClick={toggleSort}>
				<Icon icon={EIcon.SORT_ALPHABETHICAL} />
			</div>
		</div>
	);
}

/***************************************************************
 * CONTENT ROWS
 ***************************************************************/

const DataTableRows = (props: IDataTableProps) => {
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