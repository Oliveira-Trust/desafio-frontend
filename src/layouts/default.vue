<template>
    <div class="page-flexbox-wrapper">
        <header-component />
        <main class="container mx-auto mb-10 sm:px-0 px-5">
            <ot-notification
                :show="notification.show"
                :type="notification.type"
                :message="notification.message"
            />
            <router-view />
        </main>
        <footer-component />
    </div>
</template>

<script>
import { mapState } from "vuex";
import headerComponent from "./header.vue"
import footerComponent from "./footer.vue"
export default {
    name: 'Default',
    components: {
        'header-component': headerComponent,
        'footer-component': footerComponent
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
<style lang="sass">
.page-flexbox-wrapper
    display: flex
    min-height: 100vh
    flex-direction: column

main
    flex: 1 1 auto
</style>
