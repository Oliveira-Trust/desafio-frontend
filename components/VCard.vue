<template>
  <div class="card pa-4 flex items-center">
    <div class="w-70">
      <h4 class="mb-2 font-extralight">{{ title }}</h4>
      <div class="card__value font-bold ml-4">{{ value }}</div>
    </div>
    <div class="w-30 text-center">
      <font-awesome-icon class="xxl-icon" :icon="icon" />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Prop, Component } from 'nuxt-property-decorator'

@Component
export default class CardComponent extends Vue {
  @Prop({ type: String, required: true }) readonly title!: string
  @Prop({ type: Number, required: true }) readonly value!: number
  @Prop({
    type: Array,
    required: true,
    validator: (value) =>
      value.length === 2 &&
      ['fas', 'far'].includes(value[0]) &&
      ['users', 'bell', 'file'].includes(value[1]),
  })
  readonly icon!: string[]
}
</script>

<style lang="scss" scoped>
.card {
  border: 1px solid $cor-preta;
  border-radius: 20px;
  height: 10rem;

  &__value {
    font-size: 1.875rem;
  }
}
</style>
