<template>
  <aside
    class="
      aside
      overflow-hidden
      w-70
      sm:w-50
      md:w-40
      lg:sticky lg:flex lg:flex-column lg:w-40 xl:w-20
    "
    :class="{ 'absolute': hiddenMobile, 'fixed visible': !hiddenMobile }"
  >
    <div class="aside__logo flex justify-center items-center w-full py-5">
      <i class="header__menu mr-4 lg:none" @click="hiddenMobile = true">
        <font-awesome-icon :icon="['fas', 'bars']" />
      </i>
      <img src="/logotipo.svg" class="w-80" />
    </div>
    <nav class="aside__nav h-full">
      <LayoutListNavigation class="w-80 mt-6 mx-auto" :items="menu" />
    </nav>
  </aside>
</template>

<script lang="ts">
import { Vue, PropSync, Component } from 'nuxt-property-decorator'

@Component
export default class AsideNavigationComponent extends Vue {
  @PropSync('isHiddenMobile', { type: Boolean, default: true }) readonly hiddenMobile!: boolean

  menu = [
    {
      icon: ['fas', 'home'],
      link: '/',
      title: 'Dashboard',
      subMenu: [
        {
          hash: 'cards',
          icon: ['fas', 'info-circle'],
          title: 'Geral',
        },
        {
          hash: 'funcionarios',
          icon: ['fas', 'users'],
          title: 'Funcionários',
        },
      ],
    },
    {
      icon: ['far', 'envelope'],
      link: '/',
      title: 'Mensagens',
    },
    {
      icon: ['fas', 'upload'],
      link: '/',
      title: 'Upload',
    },
    {
      icon: ['far', 'user'],
      link: '/',
      title: 'Perfil',
    },
    {
      icon: ['fas', 'cog'],
      link: '/',
      title: 'Configurações',
    },
  ]

  isActive(link: string) {
    return this.$route.path === link
  }
}
</script>

<style lang="scss" scoped>
.aside {
  background-color: $cor-branca;
  border-right: 1px solid rgba($cor-preta, 0.1);
  bottom: 0;
  max-height: 100vh;
  top: 0;
  transform: translateX(calc(-100% - 1px));
  transition: transform 0.3s ease-in-out;
  z-index: 1000;

  @include regra-responsiva('lg') {
    transform: translateX(0);
  }

  &.visible {
    transform: translateX(0);
  }

  &__nav {
    overflow-y: auto;
  }
}
</style>
