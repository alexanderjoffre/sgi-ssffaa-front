export interface IIntlStrategy {
	language: string;
	dateFormat: string;
	moneyName: string;
	countryName: string;
	countryShortName: string;

	phone(value: number): string;
	number(value: number): string;
	money(value: number): string;
}