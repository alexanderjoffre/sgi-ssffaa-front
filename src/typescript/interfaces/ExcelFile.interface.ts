import { IHasUuid } from "./HasUuid.interface";

export interface IExcelSheet {
	name: string;
	headers: string[];
	data: any[];
}