import { UserModel } from "../models/User.model";
import { UserSchema } from "../schemas/User.schema";

export class LocalStorageHandler {

	private static instance: LocalStorageHandler;

	private constructor() {}

	public static getAdapter(): LocalStorageHandler {
		if (!LocalStorageHandler.instance) {
			LocalStorageHandler.instance = new LocalStorageHandler();
		}

		return LocalStorageHandler.instance;
	}

	private get(key: string): string {
		return window.localStorage.getItem('sgi-sfa' + key) || '';
	}
	
	private set(key: string, value: string): void {
		window.localStorage.setItem('sgi-sfa' + key, value);
	}

	public saveUser(user: UserSchema): void {
		this.set('user',JSON.stringify({
			email: user.getEmail(),
			displayName: user.getDisplayName(),
			status: user.getStatus(),
			token: user.getToken()
		}));
	}

	public getUser(): UserModel {
		const localStorageUser = JSON.parse(this.get('user') || '{}')
		const user = new UserModel(
			localStorageUser.email,
			localStorageUser.displayName,
			localStorageUser.status
		);

		user.setToken(localStorageUser.token);

		return user;
	}
}