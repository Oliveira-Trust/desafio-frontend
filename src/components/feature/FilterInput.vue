<script setup lang="ts">
import TextInput from '../common/TextInput.vue'
import { useAppStore } from '@/stores'
import { computed } from 'vue'
import CommonButton from '../common/CommonButton.vue'

const store = useAppStore()
const filter = computed(() => store.filter)

const onSearchClick = async () => {
  store.setFilter(filter.value)
  await store.pullPaginatedUsers({ currentPage: 1 })
}

const onClearFiltersClick = async () => {
  store.setFilter({
    nome: '',
    sobrenome: '',
    email: ''
  })
  await store.pullPaginatedUsers({ currentPage: 1 })
}
</script>

<template>
  <div class="flex justify-between">
    <div class="filter-group flex justify-between w-full gap-x-4">
      <TextInput
        class="filter-input"
        name="nome"
        placeholder="Filtrar nome"
        v-model="filter.nome"
      />
      <TextInput
        class="filter-input"
        name="sobrenome"
        placeholder="Filtrar sobrenome"
        v-model="filter.sobrenome"
      />
      <TextInput
        class="filter-input"
        name="email"
        placeholder="Filtrar e-mail"
        v-model="filter.email"
      />
      <div class="filter-group-actions flex justify-between items-center gap-x-4">
        <CommonButton
          class="search-button filter-group-actions-button"
          @onClick="onSearchClick"
          label="Buscar"
          outlined
          icon="search"
        />
        <CommonButton
          class="clear-button filter-group-actions-button"
          @onClick="onClearFiltersClick"
          label="Limpar"
          :disabled="filter.nome === '' && filter.sobrenome === '' && filter.email === ''"
          icon="close"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
@media only screen and (max-width: 500px) {
  .filter-group {
    @apply justify-center items-center flex-wrap;
  }

  .filter-group-actions {
    @apply justify-center items-center w-full;
  }
  .filter-input {
    @apply w-full;
  }
  .filter-group-actions-button {
    @apply mt-2.5 w-full;
  }
}
</style>
