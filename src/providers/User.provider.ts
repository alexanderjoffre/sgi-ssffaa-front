import { EUserStatus } from "../typescript/enums/UserStatus.enum";
import { IProvider } from "../typescript/interfaces/Provider.interface";
import { ICanLogin } from "../typescript/interfaces/EntityPermission.interface";
import { IHttpRequest } from "../typescript/interfaces/HttpRequest.interface";
import { UserSchema } from "../schemas/User.schema";

export class UserProvider implements IProvider, ICanLogin<UserSchema> {

	constructor(
		readonly httpClient: IHttpRequest,
	) {}

	async login(email: string, password: string): Promise<UserSchema> {
		try {
			const user = new UserSchema(
				'21321321312312312',
				'alexander.joffre@defensa.cl',
				'Alexander Joffre',
				EUserStatus.ACTIVE
			);
			
			user.setToken('abc');
	
			return user;
		} catch (error) {
			throw new Error('No se pudo establecer comunicación con el servicio');		
		}
	}
}