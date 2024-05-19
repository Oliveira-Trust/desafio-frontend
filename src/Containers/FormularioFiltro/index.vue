<template>
  <BoxContent>
    <form @submit.prevent="submitForm" class="form">
      <Input type="text" placeholder="Nome" v-model="name" />
      <Input type="text" placeholder="Sobrenome" v-model="sobrenome" />
      <Input type="email" placeholder="E-mail" v-model="email" />
      <Button :color="'outlined'" type="submit" ><i class="pi pi-search"></i> Buscar</Button>
    </form>
  </BoxContent>
</template>

<script>
import BoxContent from '../../components/BoxContent/index.vue'
import Input from '../../components/Input/index.vue'
import Button from '../../components/Button/index.vue'

export default {
  name: 'FormularioFiltro',
  components: {
    BoxContent,
    Input,
    Button,
  },
  data() {
    return {
      name: '',
      sobrenome: '',
      email: '',
    }
  },
  methods: {
    submitForm() {
      console.log(this.name)
      console.log(this.sobrenome)
      console.log(this.email)
    },
  },
}
</script>

<style scoped>
@import './styles.css';
</style>
