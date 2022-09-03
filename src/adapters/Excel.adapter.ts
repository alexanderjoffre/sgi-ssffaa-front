
import xlsxLibrary, { Workbook, Worksheet, Buffer } from 'exceljs';
import { IExcelSheet } from '../typescript/interfaces/ExcelFile.interface';
import { IFileBuffer } from '../typescript/interfaces/FileBuffer.interface';

export class ExcelAdapter implements IFileBuffer {
	private readonly _sheets: IExcelSheet[];
	private readonly _xlsxLibrary = xlsxLibrary;

	constructor( sheets: IExcelSheet[]	) {
		this._sheets = sheets;
	}

	async getArrayBuffer(): Promise<ArrayBuffer> {
		const workbook = this.createWorkBook();

		this._sheets.forEach( (sheet: IExcelSheet) => {
			this.createWorkSheet( workbook, sheet );
		});

		const buffer: Buffer = await workbook.xlsx.writeBuffer();

		return buffer
	}

	createWorkBook(): Workbook {
		const workbook: Workbook = new this._xlsxLibrary.Workbook();
		workbook.created = new Date();
		workbook.creator = 'www.mycompany.com';
		workbook.modified = new Date();
		workbook.lastModifiedBy = 'www.mycompany.com';
		workbook.calcProperties.fullCalcOnLoad = true;

		return workbook;
	}

	createWorkSheet(workbook: Workbook, sheet: IExcelSheet): Worksheet {
		const worksheet: Worksheet = workbook.addWorksheet(sheet.name);

		worksheet.addTable({
			name: `table-${sheet.name}`,
			ref: 'A1',
			headerRow: true,
			style: {
				showRowStripes: true,
			},
			columns: sheet.headers.map( h => ({
				name: h,
				filterButton: true
			})),
			rows: sheet.data.map( 
				(record: any) => Object.values(record)
			),
		});

		// Set all columns width
		sheet.headers.forEach( (header, index) => {
			const col = worksheet.getColumn(index+1)
			const maxWidth = 80

			const dataLength = Math.max(...[
				`${header}`.length,
				...sheet.data.map( (record: any) => `${record[index]}`.length )
			])
			
			col.width = (dataLength > maxWidth ? maxWidth : dataLength) + 4
		})

		return worksheet;
	}

}