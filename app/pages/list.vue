<script setup lang="ts">
import { Download, Eye, PackageOpen, ThumbsUp } from "lucide-vue-next";
import type { IMod } from "~~/shared/interface";

const list = ref<IMod[]>([]);
const order = ref("1"); // 0=默认 1=游览 2=下载 3=点赞 4=收藏 5=最新发布
const page = ref(1);
const search = ref("");
const original = ref(1); //  1=原创 2=翻译
const total = ref(0);

async function getList() {
    const res = await fetch("/api/team/modList", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            page: page.value,
            pageSize: 24,
            original: original.value,
            order: Number(order.value),
            search: search.value,
        }),
    });
    const responseData = await res.json();
    if (responseData.data) {
        list.value = responseData.data.data || [];
        total.value = responseData.data.count || 0;
    }
}

getList();

useSeoMeta({
    title: "作品",
});
</script>

<template>
    <Card class="space-y-6 max-w-7xl mx-auto">
        <CardHeader>
            <div
                class="flex flex-col items-start gap-4 md:flex-col md:items-start md:justify-between">
                <div class="space-y-2">
                    <Badge variant="secondary" class="w-fit px-3 py-1 text-sm">
                        Gloss Mod 作品列表
                    </Badge>
                    <div class="space-y-1">
                        <CardTitle
                            class="text-3xl font-semibold tracking-tight flex items-center gap-3">
                            作品列表 <Badge>{{ total }} 件作品</Badge>
                        </CardTitle>
                    </div>
                </div>
                <!-- Header / Filters -->
                <div
                    class="w-full flex flex-col md:flex-row justify-between items-center gap-4">
                    <div class="flex items-center gap-4 w-full md:w-auto">
                        <!-- Original / Translate Tabs -->
                        <ButtonGroup>
                            <Button
                                @click="
                                    original = 1;
                                    page = 1;
                                    getList();
                                "
                                :variant="original === 1 ? 'default' : 'ghost'">
                                原创
                            </Button>
                            <Button
                                @click="
                                    original = 2;
                                    page = 1;
                                    getList();
                                "
                                :variant="original === 2 ? 'default' : 'ghost'">
                                翻译
                            </Button>
                        </ButtonGroup>

                        <!-- Sort Order -->
                        <Select
                            v-model="order"
                            @update:model-value="
                                page = 1;
                                getList();
                            ">
                            <SelectTrigger class="w-35">
                                <SelectValue placeholder="排序方式" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="1">最多访问</SelectItem>
                                    <SelectItem value="2">最多下载</SelectItem>
                                    <SelectItem value="3">最多点赞</SelectItem>
                                    <SelectItem value="4">最多收藏</SelectItem>
                                    <SelectItem value="5">最新发布</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>

                    <!-- Search Box -->
                    <div class="relative w-full md:w-64">
                        <Input
                            v-model="search"
                            @keyup.enter="
                                page = 1;
                                getList();
                            "
                            type="text"
                            placeholder="搜索 Mod 名称或作者..."
                            class="w-full" />
                    </div>
                </div>
            </div>
        </CardHeader>
        <CardContent>
            <!-- Mod List Grid -->
            <div
                v-if="list.length > 0"
                class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                <Card
                    v-for="item in list"
                    :key="item.id"
                    class="overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
                    <a
                        :href="`https://mod.3dmgame.com/mod/${item.id}`"
                        target="_blank">
                        <div
                            class="aspect-video w-full bg-muted relative overflow-hidden group">
                            <img
                                v-if="item.mods_image_url"
                                :src="`https://assets-mod.3dmgame.com${item.mods_image_url}`"
                                class="w-full h-full object-cover transition-transform group-hover:scale-105"
                                :alt="item.mods_title" />
                            <div
                                v-else
                                class="flex w-full h-full items-center justify-center text-muted-foreground text-sm">
                                暂无封面
                            </div>
                            <Badge
                                v-if="item.mods_type_name"
                                class="absolute top-2 right-2 shadow-xs"
                                >{{ item.mods_type_name }}</Badge
                            >
                        </div>

                        <CardHeader class="p-4 pb-2">
                            <div class="flex items-center gap-2 mb-2">
                                <Avatar class="h-6 w-6">
                                    <AvatarImage
                                        :src="
                                            item.user_avatar?.includes('my')
                                                ? item.user_avatar
                                                : `https://assets-mod.3dmgame.com${item.user_avatar}`
                                        " />
                                    <AvatarFallback>{{
                                        item.user_nickName?.[0] || "?"
                                    }}</AvatarFallback>
                                </Avatar>
                                <span
                                    class="text-xs font-medium truncate text-muted-foreground"
                                    >{{ item.user_nickName }}</span
                                >
                            </div>
                            <CardTitle
                                class="text-base line-clamp-1"
                                :title="item.mods_title"
                                >{{ item.mods_title }}</CardTitle
                            >
                        </CardHeader>

                        <CardContent class="p-4 pt-0">
                            <div
                                class="flex items-center justify-between text-xs text-muted-foreground/80 mt-2">
                                <div
                                    class="flex items-center gap-1"
                                    title="游览量">
                                    <Eye class="h-3.5 w-3.5" />
                                    <span>{{ item.mods_click_cnt }}</span>
                                </div>
                                <div
                                    class="flex items-center gap-1"
                                    title="下载量">
                                    <Download class="h-3.5 w-3.5" />
                                    <span>{{ item.mods_download_cnt }}</span>
                                </div>
                                <div
                                    class="flex items-center gap-1"
                                    title="点赞数">
                                    <ThumbsUp class="h-3.5 w-3.5" />
                                    <span>{{ item.mods_mark_cnt }}</span>
                                </div>
                            </div>
                        </CardContent>
                    </a>
                </Card>
            </div>

            <!-- Empty State -->
            <div
                v-else
                class="flex flex-col items-center justify-center py-20 text-muted-foreground">
                <PackageOpen class="mb-4 h-12 w-12 opacity-50" />
                <p>未找到相关 Mod 资源</p>
            </div>

            <!-- Pagination controls -->
            <div
                v-if="total > 0"
                class="flex items-center justify-center pt-6 mt-8">
                <Pagination
                    v-model:page="page"
                    :total="total"
                    :items-per-page="24"
                    :sibling-count="1"
                    show-edges
                    @update:page="getList()">
                    <PaginationContent v-slot="{ items }">
                        <PaginationPrevious />

                        <template v-for="(item, index) in items">
                            <PaginationItem
                                v-if="item.type === 'page'"
                                :key="index"
                                :value="item.value"
                                :isActive="item.value === page">
                                {{ item.value }}
                            </PaginationItem>
                            <PaginationEllipsis
                                v-else
                                :key="item.type"
                                :index="index" />
                        </template>

                        <PaginationNext />
                    </PaginationContent>
                </Pagination>
            </div>
        </CardContent>
    </Card>
</template>

<style scoped></style>
