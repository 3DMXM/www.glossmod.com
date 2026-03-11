<script setup lang="ts">
import {
    ArrowRight,
    ExternalLink,
    FolderKanban,
    Github,
    Layers3,
    MessageCircleMore,
    Sparkles,
    Users2,
    UserPlus,
    Zap,
} from "lucide-vue-next";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

useHead({
    title: "Gloss Mod组",
    htmlAttrs: {
        lang: "zh-CN",
    },
    meta: [
        {
            name: "description",
            content: "Gloss Mod组组织首页，展示团队成员、项目生态与招募信息。",
        },
    ],
});

const pillars = [
    {
        title: "组织介绍",
        description:
            "Gloss Mod组是一个由游戏 Mod 爱好者与创作者组成的协作组织，围绕原创、汉化、工具链与社区分享持续推进。",
        icon: Users2,
    },
    {
        title: "工作方式",
        description:
            "以项目驱动沉淀能力，强调可发布作品、长期维护与经验共享，让创作者可以在真实项目里持续成长。",
        icon: Zap,
    },
    {
        title: "社区目标",
        description:
            "把 Mod 制作从单点创作扩展为可协作、可管理、可复用的生态，让更多玩家和开发者受益。",
        icon: Layers3,
    },
] as const;

const membersPage = ref(1);
const membersPageSize = 12;
const membersTotal = ref(0);
const membersTotalPages = computed(() =>
    Math.max(1, Math.ceil(membersTotal.value / membersPageSize)),
);

const { data: orgMembers, pending: membersPending } = await useAsyncData(
    "orgMembers",
    async () => {
        try {
            const membersRes = await $fetch<{
                success: boolean;
                data?: {
                    data: Array<{
                        id: number;
                        user_nickName: string;
                        user_Intr: string;
                        user_avatar: string;
                        user_tag: string;
                        mod_count: number;
                        mod_original_count: number;
                        mod_translate_count: number;
                    }>;
                    count: number;
                };
            }>("/api/team/userList", {
                method: "POST",
                body: {
                    page: membersPage.value,
                    pageSize: membersPageSize,
                    search: "",
                },
            });

            const membersRows = membersRes.data?.data || [];
            membersTotal.value = membersRes.data?.count || 0;

            return membersRows.map((m) => ({
                name: m.user_nickName,
                role: `${m.user_tag || "团队成员"} · 作品 ${m.mod_count}`,
                summary:
                    m.user_Intr ||
                    `原创 ${m.mod_original_count} / 汉化 ${m.mod_translate_count}`,
                initials: m.user_nickName.substring(0, 2).toUpperCase(),
                href: `https://mod.3dmgame.com/u/${m.id}`,
                avatar: m.user_avatar
                    ? `https://mod.3dmgame.com${m.user_avatar}`
                    : "",
            }));
        } catch (error) {
            // Fallback in case of rate limiting
            return [
                {
                    name: "XMDS",
                    role: "组织发起 / 生态推进",
                    summary:
                        "围绕 Gloss Mod 组织、社区运营与项目生态持续推进。",
                    initials: "XM",
                    href: "https://github.com/XMDS",
                    avatar: "https://avatars.githubusercontent.com/u/20371019?v=4",
                },
                {
                    name: "3DMXM",
                    role: "核心维护 / 项目协作",
                    summary:
                        "参与组织管理与项目落地，持续维护公开仓库和讨论渠道。",
                    initials: "3D",
                    href: "https://github.com/3DMXM",
                    avatar: "https://avatars.githubusercontent.com/u/28587093?v=4",
                },
                {
                    name: "Open Contributors",
                    role: "原创 / 汉化 / 工具开发",
                    summary:
                        "面向有作品与执行力的创作者开放，欢迎持续贡献 Mod、脚本与工具。",
                    initials: "OC",
                    href: "https://github.com/orgs/GlossMod/people",
                    avatar: "",
                },
            ];
        }
    },
    {
        watch: [membersPage],
    },
);

const { data: orgInfo } = await useAsyncData("orgInfo", () =>
    $fetch("https://api.github.com/users/GlossMod"),
);

const projectsPage = ref(1);
const projectsPageSize = 24;
const projectsTotal = ref(0);
const projectsTotalPages = computed(() =>
    Math.max(1, Math.ceil(projectsTotal.value / projectsPageSize)),
);

const { data: repositories, pending: projectsPending } = await useAsyncData(
    "repos",
    async () => {
        const modRes = await $fetch<{
            success: boolean;
            data?: {
                data: Array<{
                    id: number;
                    mods_title: string;
                    mods_desc: string;
                    mods_download_cnt: number;
                    mods_click_cnt: number;
                    mods_type_name: string;
                    game_name: string;
                }>;
                count: number;
            };
        }>("/api/team/modList", {
            method: "POST",
            body: {
                page: projectsPage.value,
                pageSize: projectsPageSize,
                original: 1,
                order: 1,
                search: "",
            },
        });

        const rows = modRes.data?.data || [];
        projectsTotal.value = modRes.data?.count || 0;
        return rows.map((item) => ({
            id: item.id,
            html_url: `https://mod.3dmgame.com/mod/${item.id}`,
            language: item.mods_type_name || item.game_name || "作品",
            stargazers_count:
                item.mods_download_cnt || item.mods_click_cnt || 0,
            name: item.mods_title,
            description: item.mods_desc,
        }));
    },
    {
        watch: [projectsPage],
    },
);

const prevMembersPage = () => {
    if (membersPage.value > 1) {
        membersPage.value -= 1;
    }
};

const nextMembersPage = () => {
    if (membersPage.value < membersTotalPages.value) {
        membersPage.value += 1;
    }
};

const prevProjectsPage = () => {
    if (projectsPage.value > 1) {
        projectsPage.value -= 1;
    }
};

const nextProjectsPage = () => {
    if (projectsPage.value < projectsTotalPages.value) {
        projectsPage.value += 1;
    }
};

const requirements = [
    "具备独立原创或汉化 Mod 的能力",
    "至少完成并发布过一个原创或汉化作品",
    "愿意长期投入时间，把创作当作持续打磨的过程",
    "目前重点招募 Mod 原创组与 Mod 汉化组",
] as const;

const channels = [
    {
        label: "QQ群 816193901",
        href: "http://qm.qq.com/cgi-bin/qm/qr?_wv=1027&k=rQqT7WZXLr1Gje-ggMqiAJx4MVjmLPp1&authKey=9om%2B%2FIRffAQwCuu5ciw3i8FB9HnES2vdMoDd6tmGKercZmKWMj1fT6lmrO66o5dm&noverify=0&group_code=816193901",
    },
    {
        label: "Discord 社区",
        href: "https://discord.gg/TF46tu7Upw",
    },
    {
        label: "GitHub 申请格式",
        href: "https://github.com/orgs/GlossMod/discussions/2",
    },
] as const;
</script>

<template>
    <div
        class="relative min-h-screen bg-background text-foreground antialiased selection:bg-primary/20 selection:text-primary"
    >
        <!-- Minimal Grid Background -->
        <div
            class="pointer-events-none fixed inset-0 z-[-1] bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-[0.03] dark:opacity-[0.05]"
        />

        <!-- Header -->
        <header
            class="sticky top-0 z-50 w-full border-b border-border/40 bg-background/60 backdrop-blur-xl transition-all"
        >
            <div
                class="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8"
            >
                <a
                    href="#top"
                    class="flex items-center gap-3 transition-opacity hover:opacity-80"
                >
                    <Avatar class="size-8 rounded-lg">
                        <AvatarImage
                            v-if="orgInfo?.avatar_url"
                            :src="orgInfo.avatar_url"
                            alt="Gloss Mod"
                        />
                        <AvatarFallback
                            class="rounded-lg bg-primary text-xs font-bold text-primary-foreground shadow-sm"
                            >GM</AvatarFallback
                        >
                    </Avatar>
                    <span
                        class="text-sm font-semibold tracking-widest text-foreground"
                        >{{ orgInfo?.name || "GLOSS MOD" }}</span
                    >
                </a>
                <nav
                    class="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground"
                >
                    <a
                        href="#about"
                        class="hover:text-foreground transition-colors"
                        >关于</a
                    >
                    <a
                        href="#team"
                        class="hover:text-foreground transition-colors"
                        >成员</a
                    >
                    <a
                        href="#projects"
                        class="hover:text-foreground transition-colors"
                        >项目</a
                    >
                    <a
                        href="#join"
                        class="hover:text-foreground transition-colors"
                        >招募</a
                    >
                </nav>
                <div class="flex items-center gap-4">
                    <ThemeToggle />
                    <Button
                        variant="ghost"
                        size="sm"
                        class="hidden h-9 rounded-full px-4 md:flex"
                        as-child
                    >
                        <a
                            href="https://github.com/GlossMod"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <Github class="mr-2 size-4" />
                            GitHub
                        </a>
                    </Button>
                </div>
            </div>
        </header>

        <main class="mx-auto max-w-7xl px-6 lg:px-8 flex flex-col items-center">
            <!-- Hero Component -->
            <section
                id="top"
                class="relative flex min-h-[calc(100vh-4rem)] w-full flex-col items-center justify-center py-20 text-center"
            >
                <Badge
                    variant="outline"
                    class="mb-8 rounded-full border-border/50 bg-background/50 px-4 py-1.5 text-xs font-medium tracking-widest text-muted-foreground backdrop-blur-sm"
                >
                    <Sparkles class="mr-2 size-3.5 text-primary" />
                    Gloss Mod
                </Badge>

                <h1
                    class="font-display mb-8 max-w-4xl text-5xl font-bold tracking-tight text-foreground sm:text-6xl md:text-7xl lg:text-8xl"
                >
                    为 Mod 创作构建
                    <span
                        class="mt-2 block bg-linear-to-br from-foreground to-muted-foreground bg-clip-text text-transparent"
                    >
                        长期协作的生态
                    </span>
                </h1>

                <p
                    class="mb-12 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl"
                >
                    从原创与汉化，到模组管理器、训练器与 MCP 工具链，Gloss Mod
                    组把零散的内容创作沉淀成一套持续演进的开源生态。
                </p>

                <div class="flex flex-col gap-4 sm:flex-row">
                    <Button
                        size="lg"
                        class="h-12 rounded-full px-8 text-base shadow-sm"
                        as-child
                    >
                        <a href="#projects">
                            浏览项目列表
                            <ArrowRight class="ml-2 size-4" />
                        </a>
                    </Button>
                    <Button
                        variant="ghost"
                        size="lg"
                        class="h-12 rounded-full border-border/60 bg-background/50 px-8 text-base shadow-sm backdrop-blur-sm"
                        as-child
                    >
                        <a href="#join"> 加入组织 </a>
                    </Button>
                </div>
            </section>

            <!-- About Section -->
            <section id="about" class="w-full py-24 lg:py-32">
                <div class="mb-16 max-w-2xl">
                    <h2
                        class="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
                    >
                        一种务实的工作方式
                    </h2>
                    <p class="mt-4 text-lg text-muted-foreground">
                        团队以“用爱发电”的长期主义运作，聚焦实际的工具沉淀与内容落地。
                    </p>
                </div>

                <div class="grid w-full gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    <div
                        v-for="pillar in pillars"
                        :key="pillar.title"
                        class="group relative rounded-3xl border border-border/50 bg-card/30 p-8 shadow-sm transition-all hover:bg-card/50"
                    >
                        <div
                            class="mb-6 inline-flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary"
                        >
                            <component :is="pillar.icon" class="size-6" />
                        </div>
                        <h3 class="mb-3 text-xl font-semibold text-foreground">
                            {{ pillar.title }}
                        </h3>
                        <p
                            class="text-sm leading-relaxed text-muted-foreground"
                        >
                            {{ pillar.description }}
                        </p>
                    </div>
                </div>
            </section>

            <Separator class="opacity-30 w-full" />

            <!-- Team Section -->
            <section id="team" class="w-full py-24 lg:py-32">
                <div
                    class="mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
                >
                    <div class="max-w-xl">
                        <h2
                            class="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
                        >
                            项目驱动的团队
                        </h2>
                        <p class="mt-4 text-lg text-muted-foreground">
                            公开可见成员与核心协作者共同构成组织骨架，依靠作品、工具沉淀与协作推进。
                        </p>
                    </div>
                </div>

                <div class="grid w-full gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <template v-if="membersPending">
                        <div
                            v-for="i in 3"
                            :key="i"
                            class="flex gap-5 rounded-3xl border border-border/50 bg-card/30 p-6 shadow-sm animate-pulse"
                        >
                            <div class="size-14 rounded-2xl bg-muted"></div>
                            <div class="flex flex-1 flex-col space-y-2">
                                <div class="h-5 w-1/2 bg-muted rounded"></div>
                                <div class="h-3 w-1/3 bg-muted rounded"></div>
                                <div
                                    class="h-4 w-full bg-muted rounded mt-2"
                                ></div>
                            </div>
                        </div>
                    </template>
                    <template v-else-if="orgMembers">
                        <div
                            v-for="member in orgMembers"
                            :key="member.name"
                            class="flex gap-5 rounded-3xl border border-border/50 bg-card/30 p-6 shadow-sm transition-all hover:bg-card/50"
                        >
                            <Avatar
                                class="size-14 rounded-2xl border border-border/60 bg-muted/50"
                            >
                                <AvatarImage
                                    v-if="member.avatar"
                                    :src="member.avatar"
                                    :alt="member.name"
                                />
                                <AvatarFallback
                                    class="font-display font-medium text-foreground"
                                    >{{ member.initials }}</AvatarFallback
                                >
                            </Avatar>
                            <div class="flex flex-1 flex-col">
                                <div class="flex items-center justify-between">
                                    <h3
                                        class="text-lg font-semibold text-foreground"
                                    >
                                        {{ member.name }}
                                    </h3>
                                    <a
                                        :href="member.href"
                                        target="_blank"
                                        rel="noreferrer"
                                        class="text-muted-foreground hover:text-primary transition-colors"
                                    >
                                        <ExternalLink class="size-4" />
                                    </a>
                                </div>
                                <p
                                    class="mt-1 text-xs font-medium text-primary/80"
                                >
                                    {{ member.role }}
                                </p>
                                <p
                                    class="mt-3 text-sm leading-relaxed text-muted-foreground line-clamp-2"
                                >
                                    {{ member.summary }}
                                </p>
                            </div>
                        </div>
                    </template>
                </div>

                <div
                    class="mt-10 flex w-full items-center justify-between gap-4 rounded-2xl border border-border/40 bg-card/20 px-4 py-3"
                >
                    <p class="text-sm text-muted-foreground">
                        团队成员 第 {{ membersPage }} /
                        {{ membersTotalPages }} 页 · 共 {{ membersTotal }} 人
                    </p>
                    <div class="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            class="rounded-full"
                            :disabled="membersPending || membersPage <= 1"
                            @click="prevMembersPage"
                        >
                            上一页
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            class="rounded-full"
                            :disabled="
                                membersPending ||
                                membersPage >= membersTotalPages
                            "
                            @click="nextMembersPage"
                        >
                            下一页
                        </Button>
                    </div>
                </div>
            </section>

            <Separator class="opacity-30 w-full" />

            <!-- Projects Section -->
            <section id="projects" class="w-full py-24 lg:py-32">
                <div
                    class="mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
                >
                    <div class="max-w-xl">
                        <h2
                            class="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
                        >
                            开源项目矩阵
                        </h2>
                        <p class="mt-4 text-lg text-muted-foreground">
                            覆盖模组管理器、底层训练器到高层自动化脚本服务。
                        </p>
                    </div>
                    <Button variant="ghost" class="w-fit rounded-full" as-child>
                        <a
                            href="https://mod.3dmgame.com"
                            target="_blank"
                            rel="noreferrer"
                        >
                            探索全部
                            {{ projectsTotal || "" }} 个作品
                            <ArrowRight class="ml-2 size-4" />
                        </a>
                    </Button>
                </div>

                <div class="grid w-full gap-6 md:grid-cols-2 xl:grid-cols-3">
                    <template v-if="projectsPending">
                        <!-- Loading Skeletons -->
                        <div
                            v-for="i in 6"
                            :key="i"
                            class="group flex h-[280px] flex-col justify-between rounded-3xl border border-border/50 bg-card/30 p-8 shadow-sm animate-pulse"
                        >
                            <div>
                                <div
                                    class="mb-6 flex items-center justify-between"
                                >
                                    <div
                                        class="h-6 w-16 rounded-full bg-muted"
                                    ></div>
                                    <div
                                        class="h-4 w-8 rounded-full bg-muted"
                                    ></div>
                                </div>
                                <div
                                    class="h-6 w-3/4 rounded-md bg-muted mb-3"
                                ></div>
                                <div
                                    class="h-4 w-full rounded-md bg-muted mt-2"
                                ></div>
                                <div
                                    class="h-4 w-5/6 rounded-md bg-muted mt-2"
                                ></div>
                            </div>
                        </div>
                    </template>
                    <template v-else-if="repositories?.length">
                        <a
                            v-for="project in repositories"
                            :key="project.id"
                            :href="project.html_url"
                            target="_blank"
                            rel="noreferrer"
                            class="group flex h-full min-h-[280px] flex-col justify-between rounded-3xl border border-border/50 bg-card/30 p-8 shadow-sm transition-all hover:border-primary/30 hover:bg-card/60"
                        >
                            <div>
                                <div
                                    class="mb-6 flex items-center justify-between"
                                >
                                    <Badge
                                        v-if="project.language"
                                        variant="secondary"
                                        class="rounded-full bg-secondary/60 text-xs text-secondary-foreground font-mono"
                                    >
                                        {{ project.language }}
                                    </Badge>
                                    <Badge
                                        v-else
                                        variant="outline"
                                        class="rounded-full text-xs text-muted-foreground font-mono"
                                    >
                                        Unknown
                                    </Badge>
                                    <span
                                        class="flex items-center gap-1.5 text-xs font-medium text-muted-foreground"
                                    >
                                        <svg
                                            viewBox="0 0 16 16"
                                            fill="currentColor"
                                            class="size-3.5 text-yellow-500"
                                        >
                                            <path
                                                d="M8 1.5l2.4 5.3 5.6.5-4.2 3.8 1.2 5.4L8 13.6l-5 2.9 1.2-5.4L0 7.3l5.6-.5z"
                                            />
                                        </svg>
                                        {{ project.stargazers_count }}
                                    </span>
                                </div>
                                <h3
                                    class="mb-3 text-xl font-semibold tracking-tight text-foreground group-hover:text-primary transition-colors line-clamp-1"
                                    :title="project.name"
                                >
                                    {{ project.name }}
                                </h3>
                                <p
                                    class="text-sm leading-relaxed text-muted-foreground line-clamp-3"
                                >
                                    {{ project.description || "暂无描述。" }}
                                </p>
                            </div>
                            <div
                                class="mt-8 flex items-center text-sm font-medium text-primary opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0"
                            >
                                查看作品 <ArrowRight class="ml-1.5 size-4" />
                            </div>
                        </a>
                    </template>
                </div>

                <div
                    class="mt-10 flex w-full items-center justify-between gap-4 rounded-2xl border border-border/40 bg-card/20 px-4 py-3"
                >
                    <p class="text-sm text-muted-foreground">
                        作品列表 第 {{ projectsPage }} /
                        {{ projectsTotalPages }} 页 · 共
                        {{ projectsTotal }} 个作品
                    </p>
                    <div class="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            class="rounded-full"
                            :disabled="projectsPending || projectsPage <= 1"
                            @click="prevProjectsPage"
                        >
                            上一页
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            class="rounded-full"
                            :disabled="
                                projectsPending ||
                                projectsPage >= projectsTotalPages
                            "
                            @click="nextProjectsPage"
                        >
                            下一页
                        </Button>
                    </div>
                </div>
            </section>

            <!-- Recruitment Section -->
            <section
                id="join"
                class="w-full relative overflow-hidden rounded-3xl border border-border/50 bg-muted/20 px-6 py-20 sm:px-12 lg:px-20 lg:py-24 mb-24"
            >
                <div
                    class="absolute right-0 top-0 -mr-20 -mt-20 size-96 rounded-full bg-primary/5 blur-3xl"
                />

                <div class="relative z-10 grid gap-16 lg:grid-cols-2 lg:gap-24">
                    <div>
                        <h2
                            class="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
                        >
                            加入我们
                        </h2>
                        <p
                            class="mt-6 text-lg leading-relaxed text-muted-foreground"
                        >
                            如果你已经有可展示的作品，并愿意将热情转化为长期的协作与维护，欢迎加入
                            Gloss Mod 组织。
                        </p>

                        <div class="mt-10 space-y-5">
                            <div
                                v-for="item in requirements"
                                :key="item"
                                class="flex items-start gap-4"
                            >
                                <div
                                    class="mt-1.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary"
                                >
                                    <div
                                        class="size-1.5 rounded-full bg-primary"
                                    />
                                </div>
                                <span class="text-base text-foreground/80">{{
                                    item
                                }}</span>
                            </div>
                        </div>
                    </div>

                    <div class="flex flex-col justify-center space-y-4">
                        <a
                            v-for="channel in channels"
                            :key="channel.label"
                            :href="channel.href"
                            target="_blank"
                            rel="noreferrer"
                            class="group flex items-center justify-between rounded-2xl border border-border/60 bg-background/50 p-5 shadow-sm transition-all hover:bg-background/80 hover:border-primary/30"
                        >
                            <div class="flex items-center gap-4">
                                <div
                                    class="flex size-10 items-center justify-center rounded-full bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors"
                                >
                                    <MessageCircleMore
                                        v-if="channel.label.includes('QQ')"
                                        class="size-5"
                                    />
                                    <Users2
                                        v-else-if="
                                            channel.label.includes('Discord')
                                        "
                                        class="size-5"
                                    />
                                    <Github v-else class="size-5" />
                                </div>
                                <span class="font-medium text-foreground">{{
                                    channel.label
                                }}</span>
                            </div>
                            <ExternalLink
                                class="size-4 text-muted-foreground group-hover:text-primary transition-colors"
                            />
                        </a>
                    </div>
                </div>
            </section>
        </main>

        <!-- Footer -->
        <footer
            class="border-t border-border/40 bg-background/40 py-10 text-center"
        >
            <div
                class="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 md:flex-row lg:px-8"
            >
                <p class="text-sm font-medium text-muted-foreground">
                    &copy; {{ new Date().getFullYear() }} Gloss Mod 组.
                    秉持长期主义.
                </p>
                <div
                    class="flex items-center gap-6 text-sm text-muted-foreground"
                >
                    <a
                        href="https://github.com/GlossMod"
                        target="_blank"
                        class="hover:text-foreground transition-colors"
                        >GitHub</a
                    >
                    <a
                        href="https://gmm.aoe.top/"
                        target="_blank"
                        class="hover:text-foreground transition-colors"
                        >GMM官网入口</a
                    >
                </div>
            </div>
        </footer>
    </div>
</template>
