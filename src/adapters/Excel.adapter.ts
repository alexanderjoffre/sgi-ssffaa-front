
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

	private createWorkBook(): Workbook {
		const workbook: Workbook = new this._xlsxLibrary.Workbook();
		workbook.created = new Date();
		workbook.creator = 'www.mycompany.com';
		workbook.modified = new Date();
		workbook.lastModifiedBy = 'www.mycompany.com';
		workbook.calcProperties.fullCalcOnLoad = true;

		return workbook;
	}

	private createWorkSheet(workbook: Workbook, sheet: IExcelSheet): Worksheet {
		const columnMaxWidth = 80
		const worksheet: Worksheet = workbook.addWorksheet(sheet.name);
		const sheetData = sheet.data.map( (record) => {
			const { uuid, ...attributtes } = record;
			return Object.values(attributtes)
		});

		worksheet.columns = sheet.headers.map( (header: string, headerIndex: number) => {

			const dataLength = Math.max(...[
				`${header}`.length,
				...sheetData.map( (record: any) => `${record[headerIndex]}`.length )
			])

			return {
				header,
				width: (dataLength > columnMaxWidth ? columnMaxWidth : dataLength) + 4
			}
		});

		sheetData.forEach( (record, recordIdx) => {
			worksheet.insertRow(recordIdx + 2, record);
		})

		return worksheet;
	}

}