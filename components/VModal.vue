<template>
  <div v-if="isOpen" class="modal fixed">
    <div class="modal__overlay w-full h-full overflow-hidden" />
    <div class="modal__wrapper absolute ma-auto" :class="`${classWidth}`">
      <div class="modal__header py-8 px-4">
        <slot name="header" />
      </div>
      <div class="modal__body w-full py-8 px-4" :class="classWidth">
        <slot name="body" />
      </div>
      <div
        class="modal__footer w-full flex justify-end py-8 px-4"
        :class="classWidth"
      >
        <slot name="footer" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Prop, ModelSync, Component } from 'nuxt-property-decorator'

@Component
export default class ModalComponent extends Vue {
  @ModelSync('open', 'close-modal', { type: Boolean, required: true })
  isOpen!: number

  @Prop({
    type: String,
    default: 'w-60',
    validator: (value) => value.match(/w-([1-9][0])/g),
  })
  readonly classWidth!: string
}
</script>

<style lang="scss" scoped>
.modal {
  inset: 0;
  z-index: 99999;

  &__overlay {
    background-color: rgba($cor-preta, 0.7);
  }

  &__wrapper {
    background: $cor-branca;
    border-radius: 10px;
    height: fit-content;
    inset: 0;
    z-index: 10000000;
  }

  &__header {
    border-bottom: 1px solid rgba($cor-preta, 0.08);
  }

  &__footer {
    border-top: 1px solid rgba($cor-preta, 0.08);
  }
}
</style>
