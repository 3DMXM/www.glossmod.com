<script setup lang="ts">
import { Markdown } from "#components";
const aboutContent = ref("");

const getAboutContent = async () => {
    const res = await fetch("/docs/AboutGlossMod.md");
    const data = await res.text();
    aboutContent.value = data;
};

onMounted(() => {
    getAboutContent();
});

useSeoMeta({
    title: "关于",
});
</script>
<template>
    <div class="mx-auto max-w-6xl px-4 py-16 xl:px-6">
        <h1 class="mb-8 text-center text-4xl font-bold xl:text-left">
            关于我们
        </h1>
        <Markdown :content="aboutContent"></Markdown>
    </div>
</template>
<style scoped></style>
