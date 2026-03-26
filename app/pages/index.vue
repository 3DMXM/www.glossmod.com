<script setup lang="ts">
import { Button } from "#components";
import { Badge } from "#components";
import { Info, ArrowRight } from "lucide-vue-next";
</script>
<template>
    <div
        class="flex flex-col items-center justify-center py-20 lg:py-32 text-center px-4">
        <Badge class="mb-6 py-1 px-3 text-sm" variant="secondary">
            🎉 免费分享，用爱发电
        </Badge>

        <h1
            class="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 text-foreground">
            Gloss
            <span
                class="bg-linear-to-r from-primary to-blue-500 bg-clip-text text-transparent"
                >Mod</span
            >
            组
        </h1>

        <p
            class="text-lg md:text-xl text-muted-foreground max-w-3xl mb-12 mx-auto leading-relaxed">
            Gloss Mod组是由一群游戏Mod爱好者组成的社区Mod团队。<br />
            如果您对Mod的制作非常感兴趣，有时间愿意来免费分享自己制作的Mod，并能从中感受到乐趣，欢迎跟我们一起用爱发电！
        </p>

        <div
            class="flex flex-col sm:flex-row gap-4 justify-center w-full sm:w-auto">
            <Button size="lg" class="px-8 text-md font-medium h-12" as-child>
                <NuxtLink to="/join">加入我们 <ArrowRight /></NuxtLink>
            </Button>
            <Button
                size="lg"
                variant="outline"
                class="px-8 text-md font-medium h-12"
                as-child>
                <NuxtLink to="/about"> <Info /> 了解更多</NuxtLink>
            </Button>
            <!-- 作品 / 成员 -->
            <Button
                size="lg"
                variant="outline"
                class="px-8 text-md font-medium h-12"
                as-child>
                <NuxtLink to="/works">作品 <ArrowRight /></NuxtLink>
            </Button>
            <Button
                size="lg"
                variant="outline"
                class="px-8 text-md font-medium h-12"
                as-child>
                <NuxtLink to="/members">成员 <ArrowRight /></NuxtLink>
            </Button>
        </div>
    </div>
</template>
<style scoped></style>
