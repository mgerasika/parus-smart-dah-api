import { AxiosRequestHeaders } from "axios";
import { authService } from "../services/auth.service";

export const DAH_HEADERS = {
    'content-type': 'application/json',
    origin: 'https://cabinet.dah-online.com',
    referer: 'https://cabinet.dah-online.com/',
    // "sec-ch-ua: `"Chromium";v="104", " Not A; Brand";v="99", "Google Chrome";v="104"`,
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': 'Linux',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-site',
    'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36',
};

export const getDahAuthHeaders = async (): Promise<AxiosRequestHeaders> => {
	const auth = await authService.getAsync();
	return {
		...DAH_HEADERS,
		'Authorization': `Bearer ${auth?.accessToken}`
	}
};