import { EUserStatus } from "../typescript/enums/UserStatus.enum";
import { IProvider } from "../typescript/interfaces/Provider.interface";
import { ICanLogin } from "../typescript/interfaces/EntityPermission.interface";
import { IHttpRequest } from "../typescript/interfaces/HttpRequest.interface";
import { UserSchema } from "../schemas/User.schema";
export class UserProvider implements IProvider, ICanLogin<UserSchema> {

	constructor(
		readonly httpClient: IHttpRequest,
	) {}

	async login(username: string, password: string): Promise<UserSchema> {
		try {
			interface LoginPayloadDto {
				username: string;
				password: string;
			}
			interface LoginresponseDto {
				displayName: string;
				email: string;
				token: string;
			}

			const payload: LoginPayloadDto = { username, password };
			const userData = await this.httpClient.post<LoginresponseDto, LoginPayloadDto>(
				process.env.NEXT_PUBLIC_BFF_URL + '/auth/login',
				payload
			);

			const user = new UserSchema(
				'21321321312312312',
				userData.email,
				userData.displayName,
				EUserStatus.ACTIVE
			);
			
			user.setToken(userData.token);
	
			return user;
		} catch (error) {
			throw new Error('No se pudo establecer comunicación con el servicio');		
		}
	}
}