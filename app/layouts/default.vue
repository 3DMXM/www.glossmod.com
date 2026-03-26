<template>
    <div
        class="flex overflow-x-hidden bg-background text-foreground selection:bg-primary/30 font-sans antialiased">
        <Sidebar />
        <main class="ml-16 md:ml-64 flex-1 flex flex-col min-w-0 bg-background">
            <div class="flex-1 p-6 md:p-10">
                <slot />
            </div>
            <Footer />
        </main>
    </div>
</template>
