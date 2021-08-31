<template>
    <div class="main">
        <div class="login">
            <div class="content-login">
                <header>
                    <img alt="Vue logo" class="logo" src="./../../../../img/logotipo.svg">
                </header>

                <div class="form">
                    <form>
                        <div class="mb-3">
                            <input type="email" placeholder="Digite seu e-mail" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
                        </div>
                        <div class="mb-3">
                            <input type="password" placeholder="Digite sua senha" class="form-control" id="exampleInputPassword1">
                        </div>
                        
                        <button type="submit" class="btn btn-primary" @click.prevent="login()">Entrar</button>
                    </form>
                </div>
            </div>

        </div>
    </div>
</template>


<script>
export default {
    name: 'LoginComponent',

    data() {
        return {

        }
    },
    methods: {
        login() {
            //alert("clicou");
            //this.$router.push("/home");
            this.$router.push({name: 'home'});
        }
    }
}
</script>


<style lang="scss" src="./style.scss" scoped />