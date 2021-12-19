<template>
    <div>
        <header-component />
        <main class="container mx-auto mb-10 sm:px-0 px-5">
            <ot-notification
                :show="notification.show"
                :type="notification.type"
                :message="notification.message"
            />
            <router-view />
        </main>
    </div>
</template>

<script>
import { mapState } from "vuex";
import headerComponent from "./header.vue"
export default {
    name: 'Default',
    components: {
        'header-component': headerComponent
    },
    computed: {
        ...mapState('notification', ['notification'])
    }
};
</script>
<style lang="scss" >
body {
    background: #f5f6f8;
}
</style>
