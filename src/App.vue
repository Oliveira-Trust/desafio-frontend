<template>
    <div>
		<loading
            :active.sync="loading"
            :can-cancel="false"
            :is-full-page="true"
            blur="20px"
            color="#e2e2e2"
            :lock-scroll="true"
        ></loading>

        <router-view name="header"></router-view>
        <transition name="fade" mode="out-in">
            <router-view></router-view>
        </transition>
        <router-view name="footer"></router-view>
    </div>
</template>

<script>
// Loading some plugin css asynchronously
import { mapGetters } from 'vuex'
import Loading from 'vue-loading-overlay'

export default {
    components: {
        Loading,
    },
    computed: {
        ...mapGetters({
            loading: 'request/loadingRequest',
        }),
    }
}
</script>
