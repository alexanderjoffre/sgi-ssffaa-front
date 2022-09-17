import { IWindowStorge } from "../typescript/interfaces/WindowStorge.interface";

export class LocalStorageHandler implements IWindowStorge {

	constructor() {}

	get(key: string): string {
		return (window?.localStorage.getItem(key) || '');
	}
	
	set(key: string, value: string): void {
		window?.localStorage.setItem(key, value);
	}
}