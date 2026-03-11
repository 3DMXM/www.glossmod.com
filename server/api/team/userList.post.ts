export default defineEventHandler(async (event) => {
    const payload =
        (await readBody<{
            page?: number;
            pageSize?: number;
            search?: string;
        }>(event)) || {};

    return await $fetch("https://mod.3dmgame.com/api/team/userList", {
        method: "POST",
        body: {
            page: payload.page ?? 1,
            pageSize: payload.pageSize ?? 12,
            search: payload.search ?? "",
        },
    });
});
