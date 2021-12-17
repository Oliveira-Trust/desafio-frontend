<template>
    <div>
        <header-component />
        <main class="container mx-auto mb-10 sm:px-0 px-5">
            <router-view />
        </main>
    </div>
</template>

<script>
import headerComponent from "./header.vue"
export default {
    name: 'Default',
    components: {
        'header-component': headerComponent
    }
};
</script>
<style lang="scss" >
body {
    background: #f5f6f8;
}
</style>
