import { UserModel } from "../models/User.model";
import { EUserStatus } from "../typescript/enums/UserStatus.enum";
import { ISchema } from "../typescript/interfaces/Schema.interface";

export class UserSchema extends UserModel implements ISchema {

	constructor (
		readonly _id: string,
		email: string,
		displayName: string,
		status: EUserStatus,
	) {
		super(email, displayName, status);
	}
}