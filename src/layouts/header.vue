<template>
    <nav class="header-desktop">
        <div class="container mx-auto flex items-center justify-between">
            <div>
                <img :src="logo" width="180px" height="33px" />
            </div>
            <div class="user-section flex justify-start items-center">
                <div class="circular_image space">
                    <img src="@/assets/user.svg" />
                </div>
                <div class="space">Otávio Oliveira</div>
                <div>
                    <font-awesome-icon class="icon" icon="sign-out-alt" />
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    name: 'headerComponent',
    computed: {
        logo () {
            return 'https://www.oliveiratrust.com.br/wp-content/themes/OliveiraTrust_WP/assets/img/logotipo_padrao_grey.svg'
        }
    }
}
</script>

<style lang="scss" scoped>
.header-desktop {
    background: #fff;
    margin-bottom: 54px;
}
.header-desktop .container {
    height: 54px;
}
.user-section {
    font-size: 14px;
}
.user-section .space {
    margin-right: 15px;
}
.circular_image {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    overflow: hidden;
}
.circular_image img {
    width: 100%;
}
.icon {
    font-size: 16px;
}
</style>