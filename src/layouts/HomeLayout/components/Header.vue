<template>
    <header class="home-header">
        <div class="container">
            <h1><img :src="image" />BTC Carteiras</h1>

            <el-button @click.prevent="openForm" class="float-right btn-opened" type="info"
                >Adicionar carteira</el-button
            >
            <el-button
                @click.prevent="openForm"
                class="float-right btn-responsive"
                type="info"
                icon="el-icon-folder-add"
                circle
            ></el-button>
        </div>
    </header>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    data() {
        return {
            image: require('@/assets/img/logo.svg'),
        }
    },
    methods: {
        ...mapActions({
            setShowUserCreateForm: 'components/setShowUserCreateForm',
        }),
        openForm() {
            this.setShowUserCreateForm(true)
        },
    },
}
</script>

<style>
</style>