import { DAH_HEADERS } from "../constants/dah-headers.constant";
import { ENV } from "../constants/env.constants";
import { decrypt } from "../utils/crypt.util";
import { IMutationOptions, IMutationResult, useMutationAsync } from "../utils/use-mutation.util";
import axios from 'axios';
import { authService } from "../services/auth.service";

export interface ILoginResponse {
	accessToken: string;
	refreshToken: string;
	expiresIn: number;
	version: string;
}
export const useLoginAsync = async (options?: IMutationOptions): Promise<IMutationResult< ILoginResponse>> => {
	const { data, error } = await useMutationAsync< ILoginResponse>(() => axios.post(
		'https://api.dah-online.com/authentication/login', JSON.parse(decrypt({
			iv: ENV.DAH_IV || "",
			encryptedData: ENV.DAH_ENCRYPTED_DATA || "",
		})),
		{
			headers: {
				...DAH_HEADERS
			}
		}), options)
	
	if (data) {
		await authService.saveAsync(data);
	}
	return { data, error }
}

