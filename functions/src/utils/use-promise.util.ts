export interface IPromiseResult<T> {
    data?: T;
    error?: any;
}
export async function usePromise<T = unknown>({ promise }: { promise: () => Promise<any> }): Promise<IPromiseResult<T>> {
    try {
        const data = await promise();
        return { data: data as T };
    } catch (error) {
        return { error };
    }
}
