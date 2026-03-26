import { StorageUtils } from "~~/server/utils/StorageUtils";

export default defineEventHandler(async (event) => {
    const payload =
        (await readBody<{
            page?: number;
            pageSize?: number;
            search?: string;
        }>(event)) || {};

    const storageKey = JSON.stringify({
        name: "userList",
        payload,
    });
    const data = await StorageUtils.StorageGetByKey(
        storageKey,
        async () => {
            return await $fetch("https://mod.3dmgame.com/api/team/userList", {
                method: "POST",
                body: {
                    page: payload.page ?? 1,
                    pageSize: payload.pageSize ?? 12,
                    search: payload.search ?? "",
                },
            });
        },
        StorageUtils.cacheTime,
    );

    return data;
});
