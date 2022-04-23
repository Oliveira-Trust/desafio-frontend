<template>
  <div class="filter">
    <div class="filter-group">
      <TextInput class="filter-input" name="nome" placeholder="Nome" v-model="filter.nome"/>
      <TextInput class="filter-input" name="sobrenome" placeholder="Sobrenome" v-model="filter.sobrenome"/>
      <TextInput class="filter-input" name="email" placeholder="E-mail" v-model="filter.email"/>
      <div class="filter-group-actions">
        <Button class="filter-group-actions-submit" @onClick="onSearchClick" label="Buscar" outlined icon="search"/>
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
    async onSearchClick () {
      await this.$store.dispatch('pullUsers', { currentPage: 1 });
    }
  }
}
</script>

<style scoped>
.filter {
  display: flex;
  justify-content: space-between;
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

@media only screen and (max-width: 500px) {
  .filter-group {
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
  }

  .filter-group-actions {
    justify-content: center;
    align-items: center;
    width: 100%;
  }
  .filter-input {
    width: 100%;
    margin-right: 0;
  }
  .filter-group-actions-submit {
    margin-top: 10px;
    width: 100%;
  }
}
</style>
