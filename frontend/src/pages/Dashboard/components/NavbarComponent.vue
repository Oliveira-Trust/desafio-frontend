<template>
    <div>
        <img alt="Vue logo" class="logo" src="./../../../../../img/logotipo.svg">
        <a href="" class="logout" @click.prevent="logout">
            <font-awesome-icon icon="sign-out-alt" />
            <p>Sair</p>
        </a>
    </div>
</template>

<script>
export default {
    name: 'NavbarComponent',
    methods: {
        logout() {
            this.$router.push({name: 'login'})
        }
    }
}
</script>

<style lang="scss">
.navbar > div {
    display: flex;
    justify-content: space-between;
    width: 100%;
}

.logo {
    width: 320px;
    margin-left: 5%;
}

.logout {
    display: flex;
    justify-content: center;

    &:hover {
        color: red;
    }
}

a {
    align-items: center;
    text-decoration: none;
    color: black;
}
svg {
    margin-top: 3px;
    margin-right: 6px;
}

p {
    margin: 0;
    padding: 0;
}
</style>