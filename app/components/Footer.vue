<script setup lang="ts"></script>
<template>
    <footer
        class="flex items-center justify-center p-4 text-sm text-muted-foreground">
        <div class="flex flex-col items-center gap-2">
            <div>
                Copyright © 2019 - {{ new Date().getFullYear() }} Gloss Mod组.
                All rights reserved.
            </div>
            <div class="flex items-center justify-center">
                <a
                    href="https://beian.miit.gov.cn/"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="group flex items-center justify-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors rounded-full border border-transparent px-3 py-1.5 hover:bg-card/50"
                    >沪ICP备2026003781号-2</a
                >
            </div>
        </div>
    </footer>
</template>
<style scoped></style>
