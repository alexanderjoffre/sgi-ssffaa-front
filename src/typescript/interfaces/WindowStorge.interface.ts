export interface IWindowStorge {
	get(key: string): string;
	set(key: string, value: string): void;
}