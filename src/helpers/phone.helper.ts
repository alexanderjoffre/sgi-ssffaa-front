interface IPhoneMaskStrategy {
	getPhoneMask(phone: string): string;
}

export class PhoneMaskHelper {

	constructor() {}

	public format(phone: string, strategy: IPhoneMaskStrategy) {
		return strategy.getPhoneMask(phone);
	}

}

export class CHLPhoneMaskStrategy implements IPhoneMaskStrategy {
	getPhoneMask(phone: string): string {
		const masked = phone.match(/(\d{0,2})(\d{0,1})(\d{0,4})(\d{0,4})/);
  	return masked ? `(+${masked[1]} ${masked[2]}) ${masked[3]} ${masked[4]}` : phone;
	}
}

export class COLPhoneMaskStrategy implements IPhoneMaskStrategy {
	getPhoneMask(phone: string): string {
		const masked = phone.match(/(\d{0,2})(\d{0,3})(\d{0,4})(\d{0,4})/);
  	return masked ? `(+${masked[1]} ${masked[2]}) ${masked[3]} ${masked[4]}` : phone;
	}
}