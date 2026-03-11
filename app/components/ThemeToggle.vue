<script setup lang="ts">
import { MoonStar, SunMedium } from "lucide-vue-next";
import { computed } from "vue";
import { Button } from "@/components/ui/button";

const colorMode = useColorMode();

const isDark = computed(() => colorMode.value === "dark");

function toggleColorMode() {
    colorMode.preference = isDark.value ? "light" : "dark";
}
</script>

<template>
    <ClientOnly>
        <Button
            variant="ghost"
            size="icon"
            class="rounded-full border-border/70 bg-background/70"
            :aria-label="isDark ? '切换到亮色模式' : '切换到暗色模式'"
            @click="toggleColorMode"
        >
            <SunMedium v-if="isDark" class="size-4" />
            <MoonStar v-else class="size-4" />
        </Button>

        <template #fallback>
            <div
                class="size-9 rounded-full border border-border/70 bg-background/70"
            />
        </template>
    </ClientOnly>
</template>
