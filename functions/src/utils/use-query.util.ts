import { usePromise } from "./use-promise.util";

export interface IQueryResult<T> {
	data?: T;
	error?: any;
}
export interface IQueryOptions {
	enabled?: boolean;
}
export async function useQueryAsync<T = any>(callback: () => Promise<any>, options: IQueryOptions = { enabled: true }): Promise<IQueryResult<T>> {
	const { data, error } = options.enabled ? await usePromise({ promise: callback }) : { data: undefined, error: undefined };
	return { data: data ? (data as any).data : undefined, error };
}
