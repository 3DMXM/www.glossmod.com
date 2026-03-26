<script setup lang="ts">
import {
    Badge,
    Button,
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "#components";
import {
    ArrowUpRight,
    CheckCircle2,
    Github,
    MessageCircleMore,
    ShieldCheck,
    Sparkles,
    Users,
} from "lucide-vue-next";

const joinMethods = [
    {
        label: "加入 QQ 群",
        detail: "816193901",
        href: "https://qm.qq.com/q/ZEVxp5qYcc",
        icon: Users,
        tone: "bg-emerald-500/90 text-white hover:bg-emerald-500",
    },
    {
        label: "Github 讨论",
        detail: "公开交流与申请",
        href: "https://github.com/orgs/GlossMod/discussions/2",
        icon: Github,
        tone: "bg-sky-500/90 text-white hover:bg-sky-500",
    },
    {
        label: "Discord 频道",
        detail: "国际社区同步",
        href: "https://discord.gg/TF46tu7Upw",
        icon: MessageCircleMore,
        tone: "bg-blue-500/90 text-white hover:bg-blue-500",
    },
] as const;

const highlights = [
    "意见可直接传达至组内",
    "获得 3DM Mod 组专属头衔",
    "作品可优先展示与审核",
    "优先体验测试中的功能与项目",
];

const sections = [
    {
        title: "特权",
        description: "加入 Gloss Mod 组后可以获得以下支持与权益。",
        icon: Sparkles,
        items: [
            "意见官方直达",
            "Mod站的 3DM Mod组专属头衔",
            "发布作品优先展示（先发后审）",
            "优先体验测试功能",
            "论坛专属用户组",
            "游览论坛无广告",
            "随机特殊悬赏任务（任务奖励：金币、银蛇币、现金或游戏随机）",
        ],
    },
    {
        title: "要求",
        description: "招募面向愿意长期参与制作与交流的 Mod 作者。",
        icon: CheckCircle2,
        items: [
            "需要拥有独立原创或汉化 Mod 的能力",
            "至少已经完成过一个原创或汉化 Mod",
            "制作的 Mod 发布到 3DM MOD 站即可，不强求首发，只要发布就行",
        ],
    },
    {
        title: "保证",
        description: "我们不把成员当作流水线产能，而是尊重创作者本身。",
        icon: ShieldCheck,
        items: [
            "不会强制要求组员完成任务",
            "您制作的作品所有权始终归您自己，我们不会干涉",
            "不会限制组员自由，您可以去做任何你想做的事",
            "除非您违反许可协议，否则我们不会随意开除成员",
        ],
    },
] as const;

useSeoMeta({
    title: "加入",
});
</script>
<template>
    <div class="mx-auto flex max-w-6xl flex-col gap-8 lg:gap-10">
        <section
            class="relative overflow-hidden rounded-4xl border border-border/60 bg-linear-to-br from-background via-background to-accent/30 px-6 py-8 shadow-sm sm:px-8 lg:px-12 lg:py-12">
            <div class="absolute inset-0 z-0 opacity-60">
                <div
                    class="absolute -left-16 top-0 h-48 w-48 rounded-full bg-emerald-500/12 blur-3xl" />
                <div
                    class="absolute right-0 top-8 h-56 w-56 rounded-full bg-sky-500/12 blur-3xl" />
                <div
                    class="absolute bottom-0 left-1/3 h-40 w-40 rounded-full bg-blue-500/10 blur-3xl" />
            </div>

            <div
                class="relative z-10 grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(280px,0.85fr)] lg:items-center">
                <div class="space-y-6">
                    <Badge variant="secondary" class="w-fit px-3 py-1 text-sm">
                        创作招募中
                    </Badge>

                    <div class="space-y-4">
                        <h1
                            class="text-3xl font-black tracking-tight sm:text-4xl xl:text-5xl">
                            加入 Gloss Mod 组
                        </h1>
                        <p
                            class="max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
                            如果你已经具备独立制作或汉化 Mod
                            的能力，并愿意把作品发布到 3DM MOD 站，
                            这里会给你一个更稳定的交流环境、更直接的反馈链路，以及更适合长期创作的社区位置。
                        </p>
                    </div>

                    <div class="grid gap-3 sm:grid-cols-2">
                        <div
                            v-for="item in highlights"
                            :key="item"
                            class="flex items-start gap-3 rounded-2xl border border-border/60 bg-card/70 px-4 py-3 backdrop-blur-sm">
                            <div
                                class="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                                <CheckCircle2 class="h-4 w-4" />
                            </div>
                            <p class="text-sm text-foreground/90">
                                {{ item }}
                            </p>
                        </div>
                    </div>
                </div>

                <div
                    class="rounded-[1.75rem] border border-border/70 bg-card/85 p-5 shadow-lg shadow-black/5 backdrop-blur-sm sm:p-6">
                    <div class="mb-5 flex items-center justify-between gap-4">
                        <div>
                            <p
                                class="text-sm font-medium text-muted-foreground">
                                加入方式
                            </p>
                            <p class="mt-1 text-2xl font-bold tracking-tight">
                                任选一个入口联系我们
                            </p>
                        </div>
                        <div
                            class="hidden h-12 w-12 items-center justify-center rounded-2xl bg-accent text-accent-foreground sm:flex">
                            <Users class="h-6 w-6" />
                        </div>
                    </div>

                    <div class="space-y-3">
                        <Button
                            v-for="method in joinMethods"
                            :key="method.href"
                            as-child
                            size="lg"
                            class="h-auto w-full justify-between rounded-2xl px-4 py-4 text-left shadow-sm transition-transform duration-200 hover:-translate-y-0.5"
                            :class="method.tone">
                            <a
                                :href="method.href"
                                target="_blank"
                                rel="noreferrer noopener">
                                <span class="flex items-center gap-3">
                                    <span
                                        class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/15">
                                        <component
                                            :is="method.icon"
                                            class="h-5 w-5" />
                                    </span>
                                    <span class="flex flex-col">
                                        <span class="text-base font-semibold">{{
                                            method.label
                                        }}</span>
                                        <span class="text-xs text-white/80">{{
                                            method.detail
                                        }}</span>
                                    </span>
                                </span>
                                <ArrowUpRight class="h-5 w-5 shrink-0" />
                            </a>
                        </Button>
                    </div>
                </div>
            </div>
        </section>

        <section class="grid gap-5 xl:grid-cols-3">
            <Card
                v-for="section in sections"
                :key="section.title"
                class="overflow-hidden rounded-[1.75rem] border-border/70 bg-card/80 shadow-sm backdrop-blur-sm">
                <CardHeader class="space-y-4 pb-3">
                    <div
                        class="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent text-accent-foreground">
                        <component :is="section.icon" class="h-6 w-6" />
                    </div>
                    <div class="space-y-2">
                        <CardTitle class="text-2xl font-bold tracking-tight">
                            {{ section.title }}
                        </CardTitle>
                        <p class="text-sm leading-6 text-muted-foreground">
                            {{ section.description }}
                        </p>
                    </div>
                </CardHeader>

                <CardContent>
                    <ul class="space-y-3">
                        <li
                            v-for="item in section.items"
                            :key="item"
                            class="flex items-start gap-3 rounded-2xl bg-accent/35 px-4 py-3">
                            <span
                                class="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-primary" />
                            <span class="text-sm leading-6 text-foreground/90">
                                {{ item }}
                            </span>
                        </li>
                    </ul>
                </CardContent>
            </Card>
        </section>
    </div>
</template>
<style scoped></style>
