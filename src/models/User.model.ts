import { EUserStatus } from "../typescript/enums/UserStatus.enum";

export class UserModel {
	private token: string | null;

	constructor (
		private email: string,
		private displayName: string,
		private status: EUserStatus,
	) {
		this.token = null;
	}

	public getToken(): string { return this.token || '' }
	public setToken(jwtToken: string): void { this.token = jwtToken }

	public getEmail(): string { return this.email }

	public getDisplayName(): string { return this.displayName }

	public getStatus(): EUserStatus { return this.status }
	public setStatus(status: EUserStatus): void { this.status = status }

	public isActive(): boolean { return this.status === EUserStatus.ACTIVE }
}