import { IIntlText } from "./IntlText.interface";

export interface IIntlStrategy {
	readonly languageCode: string;
	readonly languageName: string;
	readonly dateLocale: string;
	readonly dateFormat: string;
	readonly text: IIntlText;

	number(value: number): string;
	money(value: number): string;

}