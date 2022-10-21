import axios from "axios";
import { DAH_HEADERS } from "../constants/dah-headers.constant";
import { authService } from "../services/auth.service";
import { IMutationOptions, IMutationResult, useMutationAsync } from "../utils/use-mutation.util";


export interface IReLoginResponse {
	accessToken: string;
	refreshToken: string;
	expiresIn: number;
	version: string;
}

export const useReLoginAsync = async (options?: IMutationOptions): Promise<IMutationResult<IReLoginResponse>> => {
	const auth = await authService.getAsync();
	const { data, error } = await useMutationAsync(() => axios.post('https://api.dah-online.com/authentication/relogin', {
		clientId: 'OSBB_CABINET_WEB', clientType: 'WEB', deviceId: 'e6f8e8efcd607ab421256a1a66d96503', refreshToken: auth?.refreshToken
	},
		{
			headers: {
				...DAH_HEADERS
			}
		}), options);
	if (data) {
		await authService.saveAsync(data);
	}
	return { data, error }
}

