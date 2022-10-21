import axios from "axios";
import { getDahAuthHeaders } from "../constants/dah-headers.constant";
import { requestDataAndIfNotAuthorizedMakeRequestAgain } from "../utils/request-data-and-if-not-autorized-request-again.util";
import { IMutationOptions, IMutationResult, useMutationAsync } from "../utils/use-mutation.util";

export enum ECounterType{
	COLD_WATER = 'COLD_WATER',
	HOT_WATER = 'HOT_WATER',
	ELECTRICITY = 'ELECTRICITY',
	HEATING = 'HEATING'
}

export type IGetApartmentsResponse = {};

export const useGetApartmentsDataAsync = async ( { page,size}:{page:number,size:number} ,options?: IMutationOptions): Promise<IMutationResult< IGetApartmentsResponse>> => {
	return requestDataAndIfNotAuthorizedMakeRequestAgain(() => useMutationAsync(async () => {
		const headers = await getDahAuthHeaders();
		return axios.post(`https://api.dah-online.com/associations/apartments/5acf0cb8-1235-4ada-a24c-8849165c3d5f/list?page=${page}&size=${size}`, 
			{},
			{
				headers
			});
	}, options));
	
};



