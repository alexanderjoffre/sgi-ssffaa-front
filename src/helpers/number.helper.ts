export class NumberHelper {

	private constructor(){}

	public static thousandSeparators( value: number, symbol: string = '') {
		const formattedNumber = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
		return `${symbol}${formattedNumber}`;
	}

}