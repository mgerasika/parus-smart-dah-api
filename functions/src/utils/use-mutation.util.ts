import { usePromise } from "./use-promise.util";

export interface IMutationResult<T> {
  data?: T;
	error?: any;
}
export interface IMutationOptions {
	enabled?: boolean;
}
export async function useMutationAsync<T = any>(
	callback: () => Promise<any>,
	options: IMutationOptions | undefined = {enabled:true}
): Promise<IMutationResult<T>> {
	const { data, error } = options.enabled ? await usePromise({ promise: callback }) : { data: undefined, error: undefined };
	return { data: data ? (data as any).data : undefined, error };
}
