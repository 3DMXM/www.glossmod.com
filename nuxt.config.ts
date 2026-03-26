import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: "2025-07-15",
    devtools: { enabled: true },
    modules: ["@nuxtjs/color-mode", "shadcn-nuxt", "@nuxtjs/seo"],
    vite: {
        plugins: [tailwindcss()],
    },
    css: ["~/assets/css/tailwind.css"],
    components: [
        {
            path: "~/components",
            extensions: ["vue"],
        },
    ],
    colorMode: {
        classSuffix: "",
        fallback: "light",
        preference: "system",
    },
    shadcn: {
        /**
         * Prefix for all the imported component.
         * @default "Ui"
         */
        prefix: "",
        /**
         * Directory that the component lives in.
         * Will respect the Nuxt aliases.
         * @link https://nuxt.com/docs/api/nuxt-config#alias
         * @default "@/components/ui"
         */
        componentDir: "@/components/ui",
    },
    site: {
        url: "https://www.glossmod.com",
        name: "Gloss Mod组",
        description:
            "Gloss Mod组是由一群游戏Mod爱好者组成的社区Mod团队, 致力于为玩家提供高质量的游戏Mod资源和支持.",
        lang: "zh-CN",
    },
});
