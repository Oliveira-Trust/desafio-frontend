<template>
  <aside
    class="
      aside
      none
      overflow-hidden
      w-50
      lg:sticky lg:flex lg:flex-column lg:w-20
    "
  >
    <div class="aside__logo flex justify-center w-full py-5">
      <img src="/logotipo.svg" class="w-80" />
    </div>
    <nav class="aside__nav h-full">
      <LayoutListNavigation class="w-80 mt-6 mx-auto" :items="menu" />
    </nav>
  </aside>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

@Component
export default class AsideNavigationComponent extends Vue {
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
  border-right: 1px solid rgba(0, 0, 0, 0.1);
  bottom: 0;
  max-height: 100vh;
  top: 0;

  &__nav {
    overflow-y: auto;
  }
}
</style>
