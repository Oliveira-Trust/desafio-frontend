<template>
  <div class="sm:relative">
    <slot
      name="ativador"
      :is-open="isOpen"
      :open="openMenu"
      :close="closeMenu"
    />
    <div
      v-if="isOpen"
      class="menu__opcoes absolute mt-1 mx-auto pa-2 lg:mt-0 lg:mx-0"
    >
      <slot name="opcoes" />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

@Component
export default class MenuComponent extends Vue {
  isOpen = false

  openMenu() {
    this.isOpen = true
  }

  closeMenu() {
    this.isOpen = false
  }
}
</script>

<style lang="scss" scoped>
.menu {
  &__opcoes {
    background-color: $cor-branca;
    border-radius: 10px;
    box-shadow: 0 3px 5px -1px rgba($cor-preta, 0.2),
      0 5px 8px 0 rgba($cor-preta, 0.14), 0 1px 14px 0 rgba($cor-preta, 0.12);
    left: 0;
    right: 0;
    width: 80vw;

    @include regra-responsiva('sm') {
      left: auto;
      max-width: 20rem;
    }
  }
}
</style>
