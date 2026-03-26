<script setup lang="ts">
import {
    CircleUser,
    HomeIcon,
    PanelTopBottomDashed,
    Info,
    CirclePlus,
    Gift,
    Table2,
} from "lucide-vue-next";
import { cn } from "@/lib/utils";
const route = useRoute();

const navItems = [
    { name: "首页", path: "/", icon: HomeIcon },
    { name: "成员", path: "/members", icon: CircleUser },
    { name: "作品", path: "/list", icon: PanelTopBottomDashed },
    { name: "加入", path: "/join", icon: CirclePlus },
    { name: "悬赏版", path: "/bounty", icon: Table2 },
    { name: "打赏", path: "/donate", icon: Gift },
    { name: "关于", path: "/about", icon: Info },
];
</script>
<template>
    <aside
        class="flex fixed h-screen w-16 md:w-64 flex-col backdrop-blur-xl transition-all duration-300">
        <div
            class="flex h-14 items-center justify-center md:justify-start md:px-6"
            data-tauri-drag-region>
            <Button variant="secondary" as-child>
                <nuxt-link to="/" class="flex items-center gap-3">
                    <div
                        class="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
                        <img src="/icon.png" alt="Logo" class="h-8 w-8" />
                    </div>
                    <h1
                        class="hidden font-bold tracking-tight md:inline-block text-lg text-foreground">
                        Gloss Mod 组
                    </h1>
                </nuxt-link>
            </Button>
        </div>

        <div class="flex-1 overflow-auto py-4 flex flex-col gap-1 px-3">
            <router-link
                v-for="item in navItems"
                :key="item.path"
                :to="item.path"
                :class="
                    cn(
                        'group flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors relative overflow-hidden',
                        route.path === item.path
                            ? 'bg-accent text-accent-foreground'
                            : 'text-muted-foreground hover:bg-accent/50 hover:text-foreground',
                    )
                ">
                <component :is="item.icon" class="h-5 w-5 shrink-0" />
                <span class="hidden md:inline-block">{{ item.name }}</span>

                <div
                    v-if="route.path === item.path"
                    class="absolute left-0 top-1/2 h-1/2 w-1 -translate-y-1/2 rounded-r-full bg-primary" />
            </router-link>
        </div>

        <div class="p-3">
            <ThemeToggle />
        </div>
    </aside>
</template>
<style scoped></style>
