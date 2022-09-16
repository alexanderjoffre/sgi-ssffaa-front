import { IIntlStrategy } from "../typescript/interfaces/IntlStrategy.interface";

export const IntlInfoSpanish: IIntlStrategy = {

	languageCode: 'es-ES',
	languageName: 'Español',
	dateLocale: 'es',
	dateFormat: 'DD-MM-YYYY',
	daysOfWeekShort: ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa', 'Do'],

	number(value: number) {
		const masked = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
		return masked;
	},

	money(value: number): string {
		const masked = this.number(value);
		return `$${masked}`;
	},

	text: {
		pages: {
			index: {
				meta: {
					kw: "",
					desc: "",
					title: "Página de Inicio"
				}
			}
		}
	}
}