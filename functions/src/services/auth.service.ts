import { IS_DEBUG } from "../constants/is-debug.constant";
import { DB } from "./db-service";

export interface IAuthInfo {
	accessToken: string;
	refreshToken: string;
	expiresIn: number;
	version: string;
}

let _authInfo: IAuthInfo | undefined = undefined;

export const authService = {
	saveAsync: async (info: IAuthInfo | undefined): Promise<void> => {
		_authInfo = info;
		if (IS_DEBUG) {
			await DB.push('/auth', info);
		}
	},
	getAsync: async (): Promise<IAuthInfo | undefined> => {
		if (!_authInfo) {
			if (IS_DEBUG) {
				const hasData = await DB.exists('/auth');
				if (hasData) {
					_authInfo = await DB.getObject<IAuthInfo>('/auth');
				}
			}
			console.log('LOAD AUTH INFO');
		}
		return _authInfo;
	}
}