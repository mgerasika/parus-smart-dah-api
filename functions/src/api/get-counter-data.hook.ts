import axios from "axios";
import { getDahAuthHeaders } from "../constants/dah-headers.constant";
import { requestDataAndIfNotAuthorizedMakeRequestAgain } from "../utils/request-data-and-if-not-autorized-request-again.util";
import { IMutationOptions, IMutationResult, useMutationAsync } from "../utils/use-mutation.util";

export interface IGetCounterRequest {
	resourceType: "COLD_WATER",
	period: "2022-10-01",
}

export interface IGetCounterResponse {
	accessToken: string;
	refreshToken: string;
	expiresIn: number;
	version: string;
}

export const useGetCounterDataAsync = async (body: IGetCounterRequest, { page,size}:{page:number,size:number} ,options?: IMutationOptions): Promise<IMutationResult< IGetCounterResponse>> => {
	return requestDataAndIfNotAuthorizedMakeRequestAgain(() => useMutationAsync(async () => {
		const headers = await getDahAuthHeaders();
		return axios.post(`https://api.dah-online.com/management/counter/indication/page?page=${page}&size=${size}`, {
			...body,
			"apartmentCounters": true,
			"buildingId": null,
			"apartmentId": null,
			"keyWord": null,
			"sectionId": null,
			"garageRowId": null,
			"associationId": "5acf0cb8-1235-4ada-a24c-8849165c3d5f"
		},
			{
				headers
			});
	}, options));
	
};



