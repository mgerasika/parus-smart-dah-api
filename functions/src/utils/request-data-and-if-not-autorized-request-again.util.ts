import { useLoginAsync } from "../api/login.hook";
import { useReLoginAsync } from "../api/re-login.hook";
import { authService } from "../services/auth.service";

export async function requestDataAndIfNotAuthorizedMakeRequestAgain<T>(callback: () => Promise<T>): Promise<T> {
    let res: any = await callback();

    if (res.error) {
        const auth = await authService.getAsync();
        await useLoginAsync({ enabled: !auth?.accessToken });
        await useReLoginAsync();
        return await callback();
    }
    return res;
}
