<template>
  <ul class="navigation-list list-none">
    <li
      v-for="(item, index) in items"
      :key="item.title"
      class="navigation-list__item flex flex-column"
      :class="{
        'py-2': isSublist,
        'pb-10': !isSublist,
        'navigation-list__item--active': isActive(item.link, index),
      }"
    >
      <div class="navigation-list__item__header flex items-center">
        <i
          class="navigation-list__icon relative mr-4"
          :class="{ 'navigation-list__icon--small': isSublist }"
        >
          <font-awesome-icon :icon="item.icon" />
        </i>
        <div class="navigation-list__title pt-1">
          <nuxt-link
            class="decoration-none black--text"
            :to="{ path: item.link, hash: item.hash }"
          >
            {{ item.title }}
          </nuxt-link>
        </div>
      </div>
      <SubListNavigation
        v-if="
          !!item.subMenu &&
          item.subMenu.length > 0 &&
          isActive(item.link, index)
        "
        class="w-80 mt-4 mx-auto"
        :items="item.subMenu"
        :is-sublist="true"
      />
    </li>
  </ul>
</template>

<script lang="ts">
import { Vue, Prop, Component } from 'nuxt-property-decorator'

interface ItemsMenu {
  icon: string[]
  link: string
  title: string
  subMenu?: {
    hash: string
    icon: string[]
    title: string
  }
}

@Component({
  name: 'SubListNavigation',
})
export default class ListNavigationComponent extends Vue {
  @Prop({ type: Array, required: true }) readonly items!: ItemsMenu[]
  @Prop({ type: Boolean, default: false }) readonly isSublist!: boolean

  isActive(link: string, index: number) {
    return this.$route.path === link && index === 0 && !this.isSublist
  }
}
</script>

<style lang="scss" scoped>
.navigation-list {
  &__icon > svg {
    height: 1.25rem;
    width: 1.25rem;
  }

  &__icon--small > svg {
    height: 1rem;
    width: 1rem;
  }

  &__item__header:hover a,
  &__item__header:hover svg,
  &__item--active > div > &__icon {
    color: $cor-primaria;
  }

  &__item--active > div > &__icon::after {
    background: rgba($cor-primaria, 0.25);
    border-bottom-right-radius: 30px;
    border-top-right-radius: 30px;
    bottom: 0;
    content: '';
    height: 2.875rem;
    left: -3rem;
    position: absolute;
    right: -12px;
    top: -12px;
  }
}
</style>
