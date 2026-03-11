export default defineEventHandler(async (event) => {
    const payload =
        (await readBody<{
            page?: number;
            pageSize?: number;
            original?: number;
            order?: number;
            search?: string;
        }>(event)) || {};

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
});
