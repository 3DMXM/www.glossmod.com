<script setup lang="ts">
import { Markdown } from "@/lib/Markdown";
import { BookText } from "lucide-vue-next";
import darkMarkdownCssUrl from "github-markdown-css/github-markdown-dark.css?url";
import lightMarkdownCssUrl from "github-markdown-css/github-markdown-light.css?url";

const props = defineProps<{
    content: string;
}>();

const colorMode = useColorMode();
const contentRef = ref<HTMLElement | null>(null);
const activeHeadingId = ref("");

const renderResult = computed(() => Markdown.renderWithHeadings(props.content));
const isDark = computed(() => colorMode.value === "dark");
const markdownThemeStylesheet = computed(() =>
    isDark.value ? darkMarkdownCssUrl : lightMarkdownCssUrl,
);

useHead(() => ({
    link: [
        {
            key: "github-markdown-theme",
            rel: "stylesheet",
            href: markdownThemeStylesheet.value,
        },
    ],
}));

const tocHeadings = computed(() => {
    const nestedHeadings = renderResult.value.headings.filter(
        (heading) => heading.level >= 2 && heading.level <= 4,
    );

    return nestedHeadings.length > 0
        ? nestedHeadings
        : renderResult.value.headings;
});

const minHeadingLevel = computed(() => {
    if (tocHeadings.value.length === 0) {
        return 1;
    }

    return Math.min(...tocHeadings.value.map((heading) => heading.level));
});

const updateActiveHeading = () => {
    if (!import.meta.client || tocHeadings.value.length === 0) {
        activeHeadingId.value = "";
        return;
    }

    const headingElements = tocHeadings.value
        .map((heading) => document.getElementById(heading.id))
        .filter((element): element is HTMLElement => element !== null);

    if (headingElements.length === 0) {
        activeHeadingId.value = "";
        return;
    }

    const offset = 140;
    const firstHeading = headingElements[0];

    if (!firstHeading) {
        activeHeadingId.value = "";
        return;
    }

    let currentHeadingId = firstHeading.id;

    for (const element of headingElements) {
        if (element.getBoundingClientRect().top - offset <= 0) {
            currentHeadingId = element.id;
            continue;
        }

        break;
    }

    activeHeadingId.value = currentHeadingId;
};

watch(
    () => renderResult.value.html,
    async () => {
        await nextTick();
        updateActiveHeading();
    },
    { immediate: true },
);

onMounted(() => {
    window.addEventListener("scroll", updateActiveHeading, { passive: true });
    window.addEventListener("hashchange", updateActiveHeading);
    updateActiveHeading();
});

onBeforeUnmount(() => {
    window.removeEventListener("scroll", updateActiveHeading);
    window.removeEventListener("hashchange", updateActiveHeading);
});
</script>
<template>
    <div class="grid gap-10 xl:grid-cols-[minmax(0,1fr)_15rem]">
        <div ref="contentRef" class="min-w-0">
            <div
                class="markdown-body bg-transparent!"
                v-html="renderResult.html" />
        </div>

        <aside v-if="tocHeadings.length > 0" class="hidden self-start xl:block">
            <div
                class="top-24 max-h-[calc(100vh-7rem)] overflow-y-auto rounded-2xl border border-border/60 bg-card/60 p-4 backdrop-blur-sm fixed">
                <div
                    class="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
                    <BookText class="h-4 w-4 text-primary" />
                    <span>此页内容</span>
                </div>

                <nav aria-label="此页内容">
                    <ul class="border-l border-border/70">
                        <li v-for="heading in tocHeadings" :key="heading.id">
                            <a
                                :href="`#${heading.id}`"
                                :class="[
                                    'block border-l px-4 py-1.5 text-sm transition-colors',
                                    activeHeadingId === heading.id
                                        ? 'border-primary text-primary'
                                        : 'border-transparent text-muted-foreground hover:text-foreground',
                                ]"
                                :style="{
                                    paddingLeft: `${
                                        1 +
                                        (heading.level - minHeadingLevel) * 0.75
                                    }rem`,
                                }">
                                {{ heading.text }}
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </aside>
    </div>
</template>
<style scoped>
:deep(.markdown-body h1),
:deep(.markdown-body h2),
:deep(.markdown-body h3),
:deep(.markdown-body h4),
:deep(.markdown-body h5),
:deep(.markdown-body h6) {
    scroll-margin-top: 6rem;
}

:deep(.footnote-item) {
    display: flex;
    & > a {
        margin-left: 0.25rem;
    }
}
:deep(.markdown-body > ul > li) {
    list-style: disc;
}
</style>
