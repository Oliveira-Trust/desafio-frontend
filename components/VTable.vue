<template>
  <div class="table-wrapper">
    <table class="table w-full">
      <thead>
        <tr>
          <td class="table__header font-medium px-6 py-3" v-for="header in headers" :key="header.code" :class="{ 'text-center': header.alignment === 'center' && header.alignHeader, 'text-right': header.alignment === 'right' && header.alignHeader }">
            {{ header.text }}
          </td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in rows" :key="index" class="table__row font-extralight">
          <td v-for="header in headers" :key="header.code" class="px-6 py-4" :class="{ 'text-center': header.alignment === 'center', 'text-right': header.alignment === 'right' }">
            <slot :name="header.code" :value="row[header.code]">
              <span>{{ row[header.code] }}</span>
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { Vue, Prop, Component } from 'nuxt-property-decorator'
import { IHeaderTable } from '~/types/IHeaderTable'
import { IUsuario } from '~/types/IUsuario'

@Component
export default class TableComponent extends Vue {
  @Prop({ type: Array, required: true, validator: (value) => value.filter((h: IHeaderTable) => !h.text || !h.code).length === 0 })
  readonly headers!: IHeaderTable[]

  @Prop({ type: Array, required: true })
  readonly rows!: IUsuario[]
}
</script>

<style lang="scss" scoped>
.table {
  border: 1px solid $cor-preta;
  border-radius: 4px;
  border-spacing: 0;

  &-wrapper {
    overflow-x: auto;
  }

  &__header {
    border-bottom: 1px solid $cor-preta;
    font-size: 0.75rem;
    text-transform: uppercase;
  }

  &__row {
    font-size: 0.75rem;
  }

  &__row:hover {
    background-color: $backgroud-primario-opaco;
    color: $cor-primaria;
  }
}
</style>