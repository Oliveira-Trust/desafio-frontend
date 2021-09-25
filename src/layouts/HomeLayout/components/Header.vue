<template>
    <header class="home-header">
        <div class="container">
            <h1><img :src="image" />BTC Carteiras</h1>
            <button class="btn btn-default" @click.prevent="redirect('/')">
                Adicionar carteira
            </button>
        </div>
    </header>
</template>

<script>
export default {
    data() {
        return {
            image: require('@/assets/img/logo.svg'),
        }
    },
}
</script>

<style>
</style>