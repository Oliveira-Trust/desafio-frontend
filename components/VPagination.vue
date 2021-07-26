<template>
  <nav
    v-if="total > 0"
    class="pagination flex flex-wrap justify-center items-center"
  >
    <button
      :disabled="currentPage === 0"
      class="
        pagination__controls pagination__button pagination__previous
        relative
        border-0
        bg-transparent
        pa-4
      "
      :class="{ 'cursor-pointer': currentPage !== 0 }"
      @click="currentPage -= 1"
    />
    <ul
      class="
        pagination__nav
        flex
        justify-center
        items-center
        list-none
        py-1
        px-8
        my-0
        mx-2
      "
    >
      <li v-if="showPreviousDot" class="pagination__page mx-1">
        <button
          disabled
          class="pagination__button border-0 bg-transparent font-bold"
        >
          ...
        </button>
      </li>
      <li
        v-for="page in visibleItems"
        :key="page"
        class="pagination__page mx-1"
        :class="{
          'cursor-pointer': page !== currentPage + 1,
          'pagination__page--active elevation': page === currentPage + 1,
        }"
        @click="currentPage = page - 1"
      >
        <button
          class="pagination__button border-0 bg-transparent font-bold"
          :class="{
            'cursor-pointer': page !== currentPage + 1,
          }"
        >
          {{ page }}
        </button>
      </li>
      <li v-if="showNextDot" class="pagination__page mx-1">
        <button
          disabled
          class="pagination__button border-0 bg-transparent font-bold"
        >
          ...
        </button>
      </li>
    </ul>
    <button
      :disabled="currentPage + 1 === total"
      class="
        pagination__controls pagination__button pagination__next
        relative
        border-0
        bg-transparent
        pa-4
      "
      :class="{ 'cursor-pointer': currentPage + 1 < total }"
      @click="currentPage += 1"
    />
    <div class="relative flex items-center mt-4 sm:mt-0">
      <button
        class="
          pagination__goto
          absolute
          cursor-pointer
          py-1
          px-2
        "
        @click="verificaPagina"
      >
        ir
      </button>
      <input
        v-model="currentPageInput"
        type="number"
        class="pagination__input border-0 bg-transparent mx-4 py-3 px-4"
        placeholder="Ir para página..."
        @change="verificaPagina"
      />
    </div>
  </nav>
</template>

<script lang="ts">
import { Vue, Prop, ModelSync, Component, Watch } from 'nuxt-property-decorator'

@Component
export default class PaginationComponent extends Vue {
  maxVisibleItems = 5
  currentPageInput = ''

  showNextDot = false
  showPreviousDot = false

  @ModelSync('page', 'update-page', { type: Number, required: true })
  currentPage!: number

  @Prop({ type: Number, required: true }) readonly total!: number

  get visibleItems() {
    const range =
      this.total < this.maxVisibleItems ? this.total : this.maxVisibleItems

    if (this.currentPage < this.maxVisibleItems) {
      this.showNextDot = range !== this.total
      this.showPreviousDot = false
      return Array(range)
        .fill(0)
        .map((_, idx) => 1 + idx)
    }

    if (this.total - this.currentPage < this.maxVisibleItems) {
      this.showNextDot = false
      this.showPreviousDot = range !== this.total
      return Array(range)
        .fill(0)
        .map((_, idx) => this.total - idx)
        .reverse()
    }

    this.showNextDot = this.showPreviousDot = true
    return [this.currentPage, this.currentPage + 1, this.currentPage + 2]
  }

  verificaPagina() {
    let inputValue = parseInt(this.currentPageInput, 10)

    if (isNaN(inputValue) || inputValue < 1) {
      inputValue = 1
      this.currentPage = 0
    } else if (inputValue > this.total) {
      inputValue = this.total
      this.currentPage = this.total - 1
    } else {
      this.currentPage = inputValue - 1
    }

    this.currentPageInput = inputValue.toString()
  }

  @Watch('currentPage')
  pageChange() {
    if (this.currentPageInput !== (this.currentPage + 1).toString())
      this.currentPageInput = ''
  }
}
</script>

<style lang="scss" scoped>
.pagination {
  width: fit-content;

  &__nav {
    border: 1px solid $cor-preta;
    border-radius: 20px;
  }

  &__button {
    font-size: inherit;
  }

  &__page {
    font-size: 1rem;
  }

  &__page--active {
    background: $backgroud-primario-opaco;
    border-radius: 4px;
    cursor: default;
    font-size: 0.875rem;
    transform: scale(1.75);
  }

  &__page--active > &__button {
    color: $cor-primaria;
  }

  &__page:not(&__page--active) > &__button {
    color: $cor-preta;
  }

  &__controls {
    border: 1px solid $cor-preta;
    border-radius: 50%;
  }

  &__controls::before {
    border-style: solid;
    border-width: 0.15rem 0.15rem 0 0;
    color: rgba($cor-primaria, 0.8);
    content: '';
    height: 0.5rem;
    inset: 0;
    margin: auto;
    position: absolute;
    width: 0.5rem;
  }

  &__previous::before {
    transform: rotate(-135deg);
  }

  &__next::before {
    transform: rotate(45deg);
  }

  &__button[disabled='disabled'],
  &__button[disabled='disabled']::before {
    color: rgba($cor-primaria, 0.3);
    cursor: default;
  }

  &__goto {
    border: 2px solid $cor-preta;
    border-radius: 50%;
    right: 1.5rem;
  }

  &__input {
    border: 1px solid $cor-preta;
    border-radius: 10px;
  }
}
</style>
