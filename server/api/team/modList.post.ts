import { StorageUtils } from "~~/server/utils/StorageUtils";

export default defineEventHandler(async (event) => {
    const payload =
        (await readBody<{
            page?: number;
            pageSize?: number;
            original?: number;
            order?: number;
            search?: string;
        }>(event)) || {};

    const storageKey = JSON.stringify({
        name: "modList",
        payload,
    });
    const data = await StorageUtils.StorageGetByKey(
        storageKey,
        async () => {
            return await $fetch("https://mod.3dmgame.com/api/team/modList", {
                method: "POST",
                body: {
                    page: payload.page ?? 1,
                    pageSize: payload.pageSize ?? 24,
                    original: payload.original ?? 1,
                    order: payload.order ?? 1,
                    search: payload.search ?? "",
                },
            });
        },
        StorageUtils.cacheTime,
    );
    return data;
});
