<template>
  <div class="filter">
    <div class="filter-group">
      <TextInput class="filter-input" name="nome" placeholder="Nome" v-model="filter.nome"/>
      <TextInput class="filter-input" name="sobrenome" placeholder="Sobrenome" v-model="filter.sobrenome"/>
      <TextInput class="filter-input" name="email" placeholder="E-mail" v-model="filter.email"/>
      <div class="filter-group-actions">
        <Button @onClick="test" label="Buscar" outlined icon="search"/>
      </div>
    </div>
  </div>
</template>

<script>
import TextInput from '../reusable/TextInput.vue'
import Button from '../reusable/Button.vue'

export default {
  name: 'FilterInput',
  components: {
    TextInput,
    Button,
  },
  computed: {
    filter () {
      return this.$store.getters.getFilter;
    }
  },
  methods: {
    test () {
      console.log(this.filter);
    }
  }
}
</script>

<style scoped>
.filter {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.filter-group {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.filter-input {
  margin-right: 20px;
}

.filter-group-actions {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
