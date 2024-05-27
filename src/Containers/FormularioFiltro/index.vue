<template>
  <BoxContent>
    <form @submit.prevent="submitForm" class="form">
      <Input type="text" placeholder="Nome" v-model="nome" />
      <Input type="text" placeholder="Sobrenome" v-model="sobrenome" />
      <Input type="email" placeholder="E-mail" v-model="email" />
      <Button :color="'outlined'" type="submit"><i class="pi pi-search"></i> Buscar</Button>
    </form>
  </BoxContent>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
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
  props: {
    name: {
      type: String,
      default: '',
    },
    lastName: {
      type: String,
      default: '',
    },
    emailUser: {
      type: String,
      default: '',
    },
  },
  computed: {
    ...mapGetters('users', ['users']),
  },
  methods: {
    ...mapActions('users', ['filterUsers', 'fetchUsers']),
    submitForm() {
      this.filterUsers({ nome: this.nome, sobrenome: this.sobrenome, email: this.email })
      if(this.nome === '' && this.sobrenome === '' && this.email === '') this.fetchUsers()
    },
  },
  data() {
    return {
      nome: this.name,
      sobrenome: this.lastName,
      email: this.emailUser,
    }
  }
}
</script>

<style scoped>
@import './styles.css';
</style>
