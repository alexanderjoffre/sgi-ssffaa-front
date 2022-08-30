import { IIntlStrategy } from "../../typescript/interfaces/IntlStrategy.interface";

export class IntlCHL implements IIntlStrategy {

	public readonly language: string;
	public readonly dateFormat: string;
	public readonly moneyName: string;
	public readonly countryName: string;
	public readonly countryShortName: string;

	constructor() {
		this.language = 'es';
		this.dateFormat = 'DD-MM-YYYY';
		this.moneyName = 'CLP';
		this.countryName = 'Chile';
		this.countryShortName = 'CHL';
	}

	phone(value: number): string {
		const masked = value.toString().match(/(\d{0,2})(\d{0,1})(\d{0,4})(\d{0,4})/);
  	return masked ? `(+${masked[1]} ${masked[2]}) ${masked[3]} ${masked[4]}`: '';
	}

	number(value: number) {
		const masked = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
		return masked;
	}

	money(value: number): string {
		const masked = this.number(value);
		return `$${masked}`;
	}
}