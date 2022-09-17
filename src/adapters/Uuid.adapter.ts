import * as uuid from 'uuid';

export class UuidAdapter {
	private _uuid = uuid;
	private static instance: UuidAdapter;

	private constructor() {}

	/**
	 * Returns a singleton UuidAdapter instance 
	 * @returns UuidAdapter
	 */
	public static getAdapter(): UuidAdapter {
		if (!UuidAdapter.instance) {
			UuidAdapter.instance = new UuidAdapter();
		}

		return UuidAdapter.instance;
	}

	/**
	 * Generate an unique id base on uuid
	 * @returns string
	 */
	public generateUuid(): string {
		return this._uuid.v4()
	}

	/**
	 * Verify if a string is a valid uuid
	 * @param uuid string
	 * @returns boolean
	 */
	public isValidUuid(uuid: string): boolean {
		return this._uuid.validate(uuid)
	}
}