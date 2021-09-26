<template>
    <div>
        <transition name="fade">
            <user-create-form
                v-on:register="updateTable"
                v-on:update="updateTable"
                v-if="showUserCreateForm"
            />
        </transition>

        <user-search-form ref="searchForm" />

        <user-search-table
            v-on:delete="updateTable"
            v-if="userCollection !== null"
        />
    </div>
</template>

<script>
import UserSearchForm from '@/views/Home/components/UserSearchForm'
import UserCreateForm from '@/views/Home/components/UserCreateForm'
import UserSearchTable from '@/views/Home/components/UserSearchTable'
import { mapGetters } from 'vuex'

export default {
    components: {
        UserSearchForm,
        UserSearchTable,
        UserCreateForm,
    },
    watch: {
        showUserCreateForm: function () {
            if (this.showUserCreateForm) {
                document.documentElement.style.overflow = 'hidden'
                return
            }
            document.documentElement.style.overflow = 'auto'
        },
    },
    computed: {
        ...mapGetters({
            userCollection: 'users/userCollection',
            showUserCreateForm: 'components/showUserCreateForm',
        }),
    },
    methods: {
        updateTable() {
            this.$refs.searchForm.clearForm()
            this.$refs.searchForm.search()
        },
    },
}
</script>

<style>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
}

.bounce-enter-active {
    animation: bounce-in 300ms;
}
.bounce-leave-active {
    animation: bounce-in 300ms reverse;
}
@keyframes bounce-in {
    0% {
        transform: scale(0);
    }
    50% {
        transform: scale(1.5);
    }
    100% {
        transform: scale(1);
    }
}
</style>