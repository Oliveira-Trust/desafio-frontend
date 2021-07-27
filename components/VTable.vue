<template>
  <div class="table-wrapper flex flex-column items-center lg:items-end">
    <table class="table w-full">
      <thead>
        <tr>
          <td
            v-for="header in headers"
            :key="header.code"
            class="table__header font-medium px-6 py-3"
            :class="{
              'text-center':
                header.alignment === 'center' && header.alignHeader,
              'text-right': header.alignment === 'right' && header.alignHeader,
            }"
          >
            {{ header.text }}
          </td>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="row in rows"
          :key="row[itemKey]"
          class="table__row font-extralight"
        >
          <td
            v-for="header in headers"
            :key="header.code"
            class="px-6 py-4"
            :class="{
              'text-center': header.alignment === 'center',
              'text-right': header.alignment === 'right',
            }"
          >
            <slot
              :name="header.code"
              :itemKey="row[itemKey]"
              :value="row[header.code]"
            >
              <span>{{ row[header.code] }}</span>
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
    <VPagination v-model="page" class="mt-4" :total="totalPages" />
  </div>
</template>

<script lang="ts">
import { Vue, Prop, Component } from 'nuxt-property-decorator'
import { IHeaderTable } from '~/types/IHeaderTable'
import { IFuncionario } from '~/types/IFuncionario'

@Component
export default class TableComponent extends Vue {
  @Prop({
    type: Array,
    required: true,
    validator: (value) =>
      value.filter((h: IHeaderTable) => !h.text || !h.code).length === 0,
  })
  readonly headers!: IHeaderTable[]

  @Prop({ type: Array, required: true })
  readonly items!: IFuncionario[]

  @Prop({ type: String, default: 'id' })
  readonly itemKey!: string

  page = 0
  itemsPerPage = 10

  get rows() {
    const start = this.page * this.itemsPerPage
    return this.items.slice(start, start + this.itemsPerPage)
  }

  get totalPages() {
    return Math.ceil(this.items.length / this.itemsPerPage)
  }
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
