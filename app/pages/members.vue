<script setup lang="ts">
import { Search, Users } from "lucide-vue-next";
import type { IUser } from "~~/shared/interface";

const members = ref<IUser[]>([]);
const page = ref(1);
const pageSize = 12;
const total = ref(0);
const search = ref("");
const loading = ref(false);

function getAvatarUrl(avatar?: string) {
    if (!avatar) return "";
    return avatar.includes("my")
        ? avatar
        : `https://assets-mod.3dmgame.com${avatar}`;
}

async function getMembers() {
    loading.value = true;

    try {
        const res = await fetch("/api/team/userList", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                page: page.value,
                pageSize,
                search: search.value.trim(),
            }),
        });

        const responseData = await res.json();
        if (responseData.data) {
            members.value = responseData.data.data || [];
            total.value = responseData.data.count || 0;
        }
    } finally {
        loading.value = false;
    }
}

function submitSearch() {
    page.value = 1;
    getMembers();
}

getMembers();

useSeoMeta({
    title: "成员",
});
</script>

<template>
    <Card class="mx-auto max-w-7xl border-border/60 bg-background/95 shadow-sm">
        <CardHeader class="space-y-6 border-b border-border/60 pb-6">
            <div
                class="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div class="space-y-2">
                    <Badge variant="secondary" class="w-fit px-3 py-1 text-sm">
                        Gloss Mod 组成员
                    </Badge>
                    <div class="space-y-1">
                        <CardTitle
                            class="text-3xl font-semibold tracking-tight flex items-center gap-3">
                            成员列表 <Badge>{{ total }} 位成员</Badge>
                        </CardTitle>
                    </div>
                </div>

                <div class="flex w-full flex-col gap-3 sm:flex-row md:w-auto">
                    <div class="relative min-w-0 flex-1 md:w-72">
                        <Search
                            class="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            v-model="search"
                            type="text"
                            placeholder="搜索成员昵称..."
                            class="pl-9"
                            @keyup.enter="submitSearch" />
                    </div>
                    <Button class="sm:w-auto" @click="submitSearch">
                        搜索
                    </Button>
                </div>
            </div>
        </CardHeader>

        <CardContent class="pt-6">
            <div
                v-if="members.length > 0"
                class="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                <Card
                    v-for="member in members"
                    :key="member.id"
                    class="border-border/60 bg-card/80 transition-shadow hover:shadow-md">
                    <a
                        :href="`https://mod.3dmgame.com/u/${member.id}`"
                        target="_blank">
                        <CardContent class="flex h-full flex-col gap-5 p-6">
                            <div class="flex items-center gap-4">
                                <Avatar
                                    class="h-14 w-14 border border-border/60">
                                    <AvatarImage
                                        :src="getAvatarUrl(member.user_avatar)"
                                        :alt="member.user_nickName" />
                                    <AvatarFallback
                                        class="text-base font-medium">
                                        {{ member.user_nickName?.[0] || "?" }}
                                    </AvatarFallback>
                                </Avatar>

                                <div class="min-w-0 flex-1 space-y-2">
                                    <div
                                        class="flex flex-wrap items-center gap-2">
                                        <h3
                                            class="truncate text-lg font-semibold text-foreground">
                                            {{ member.user_nickName }}
                                        </h3>
                                        <Badge
                                            v-if="member.group?.name"
                                            variant="outline"
                                            class="max-w-full truncate">
                                            {{ member.group.name }}
                                        </Badge>
                                        <Badge variant="secondary"
                                            >粉丝
                                            {{ member.user_fan || 0 }}</Badge
                                        >
                                    </div>
                                    <div
                                        class="grid grid-cols-3 gap-3 text-center">
                                        <div class="rounded-lg">
                                            <p
                                                class="font-semibold text-foreground">
                                                {{ member.mod_count || 0 }}
                                            </p>
                                            <p
                                                class="text-xs text-muted-foreground">
                                                作品总数
                                            </p>
                                        </div>
                                        <div class="rounded-lg">
                                            <p
                                                class="font-semibold text-foreground">
                                                {{
                                                    member.mod_original_count ||
                                                    0
                                                }}
                                            </p>
                                            <p
                                                class="text-xs text-muted-foreground">
                                                原创
                                            </p>
                                        </div>
                                        <div class="rounded-lg">
                                            <p
                                                class="font-semibold text-foreground">
                                                {{
                                                    member.mod_translate_count ||
                                                    0
                                                }}
                                            </p>
                                            <p
                                                class="text-xs text-muted-foreground">
                                                翻译
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </a>
                </Card>
            </div>

            <div
                v-else
                class="flex min-h-80 flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-border/70 bg-muted/20 px-6 text-center text-muted-foreground">
                <Users class="h-12 w-12 opacity-50" />
                <div class="space-y-1">
                    <p class="text-base font-medium text-foreground">
                        {{
                            loading ? "正在加载成员列表..." : "未找到匹配的成员"
                        }}
                    </p>
                    <p class="text-sm">
                        {{
                            loading
                                ? "正在获取成员列表，请稍候..."
                                : "可以尝试更换关键词，或清空搜索重新查看全部成员。"
                        }}
                    </p>
                </div>
            </div>

            <div
                v-if="total > pageSize"
                class="mt-8 flex items-center justify-center border-t border-border/60 pt-6">
                <Pagination
                    v-model:page="page"
                    :total="total"
                    :items-per-page="pageSize"
                    :sibling-count="1"
                    show-edges
                    @update:page="getMembers()">
                    <PaginationContent v-slot="{ items }">
                        <PaginationPrevious />

                        <template
                            v-for="(item, index) in items"
                            :key="`${item.type}-${index}`">
                            <PaginationItem
                                v-if="item.type === 'page'"
                                :value="item.value"
                                :is-active="item.value === page">
                                {{ item.value }}
                            </PaginationItem>
                            <PaginationEllipsis v-else :index="index" />
                        </template>

                        <PaginationNext />
                    </PaginationContent>
                </Pagination>
            </div>
        </CardContent>
    </Card>
</template>

<style scoped></style>
