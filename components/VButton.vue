<template>
  <button class="btn cursor-pointer pa-2 border-0" :class="{ 'btn--text bg-transparent': text }" @click="$emit('click')">
    <slot />
  </button>
</template>

<script lang="ts">
import { Vue, Prop, Component } from 'nuxt-property-decorator'

@Component
export default class ModalComponent extends Vue {
  @Prop({ type: Boolean, default: false })
  readonly text!: boolean
}
</script>

<style lang="scss" scoped>
.btn {
  &:not(&--text) {
    background-color: $backgroud-primario-opaco;
    border: 1px solid $cor-primaria;
    border-radius: 4px;
  }

  &--text {
    color: $cor-primaria;
  }
}
</style>