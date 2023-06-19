<template>
    <div class="wrapper">
        <Container>
            <div class="flexbox">
                <img src="https://www.oliveiratrust.com.br/wp-content/themes/OliveiraTrust_WP/assets/img/logotipo_padrao_grey.svg" />
                <div>
                    Rudolfo de Sousa
                </div>
            </div>
        </Container>
    </div>
</template>

<script>
import Container from '../shared/Container/Container.vue'

export default {
  name: 'Header',
  components: {
    Container
  }
}    
</script>

<style scoped>
.wrapper{
    background-color: #fff;
}
.flexbox{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 30px 0px;
}
img{
    max-width: 150px;
}
</style>