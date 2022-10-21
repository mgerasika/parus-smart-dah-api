import axios from "axios";
import { getDahAuthHeaders } from "../constants/dah-headers.constant";
import { requestDataAndIfNotAuthorizedMakeRequestAgain } from "../utils/request-data-and-if-not-autorized-request-again.util";
import { IMutationOptions, IMutationResult, useMutationAsync } from "../utils/use-mutation.util";

export interface IUpdateCounterRequest {
	counterId: string;
	period: string,
	value: string;
}

export type IUpdateCounterResponse = {};

export const useUpdateCounterDataAsync = async (body: IUpdateCounterRequest, options?: IMutationOptions): Promise<IMutationResult<IUpdateCounterResponse>> => {
	return requestDataAndIfNotAuthorizedMakeRequestAgain(() => useMutationAsync(async () => {
		const headers = await getDahAuthHeaders();
		return axios.put(`https://api.dah-online.com/management/counter/indication/set/${body.counterId}/1?period=${body.period}`, body.value,
			{
				headers
			});
	}, options));
	
};



