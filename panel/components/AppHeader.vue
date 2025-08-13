<template>
    <header class="fixed top-0 left-0 w-full bg-white z-10">
        <div class="container mx-auto px-4 py-4">
            <div class="flex items-center justify-between">
                <div class="flex items-center space-x-3">
                    <img src="/images/brand.svg" alt="Logo" class="w-40 sm:w-52 h-8 sm:h-10" />
                </div>

                <div class="flex items-center space-x-2 sm:space-x-3">
                    <div class="flex items-center space-x-2 sm:space-x-3">
                        <IconUser />

                        <span class="text-gray-900 text-xs sm:text-sm hidden sm:block">Otávio Oliveira</span>
                        <span class="text-gray-900 text-xs sm:hidden">Otávio</span>

                        <IconLogout class="w-4 h-4" />
                    </div>
                </div>
            </div>
        </div>
    </header>
</template>
