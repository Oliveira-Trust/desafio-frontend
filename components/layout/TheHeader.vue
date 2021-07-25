<template>
  <header
    class="header sticky flex justify-space-between items-center lg:justify-end"
  >
    <i class="header__menu lg:none ml-4" @click="$emit('toogle-menu')">
      <font-awesome-icon class="lg-icon" :icon="['fas', 'bars']" />
    </i>
    <div class="w-60 flex justify-evenly items-center sm:w-40 xl:mr-8 xl:w-20">
      <VMenu>
        <template #ativador="{ isOpen, open, close }">
          <button
            class="
              header__notification__button
              relative
              cursor-pointer
              border-0
              bg-transparent
            "
            @click="isOpen ? close() : open()"
            @blur="close"
          >
            <font-awesome-icon class="sm-icon" :icon="['far', 'bell']" />
          </button>
        </template>
        <template #opcoes>
          <ul class="list-none">
            <li
              v-for="notificao in notificacoes"
              :key="notificao.text"
              class="header__notificao flex py-2 px-2"
            >
              <i v-if="notificao.icon" class="mr-2">
                <font-awesome-icon class="sm-icon" :icon="notificao.icon"/>
              </i>
              <p
                class="
                  header__notificacao__texto
                  overflow-hidden
                  cursor-pointer
                "
              >
                {{ notificao.text }}
              </p>
            </li>
          </ul>
        </template>
      </VMenu>
      <span class="inline-block">Olá Usuário</span>
      <span class="header__avatar flex justify-center items-center">
        <i><font-awesome-icon class="sm-icon" :icon="['fas', 'user']" /></i>
      </span>
    </div>
  </header>
</template>

<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator'
import { NotificacoesMixin } from '~/mixins/notificacoes'

@Component
export default class HeaderComponent extends mixins(NotificacoesMixin) {}
</script>

<style lang="scss" scoped>
.header {
  background-color: $cor-branca;
  border-bottom: 1px solid rgba($cor-preta, 0.1);
  height: 4.5rem;
  top: 0;

  &__notificao {
    border-radius: 5px;
  }

  &__notificao:hover {
    background-color: $backgroud-primario-opaco;
    color: $cor-primaria;
  }

  &__notification__button::after {
    background-color: $cor-primaria;
    border-radius: 50%;
    content: '';
    height: 0.75rem;
    position: absolute;
    right: 4px;
    top: -4px;
    width: 0.75rem;
  }

  &__notificacao__texto {
    font-size: 0.875rem;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &__avatar > i > svg,
  &__notification__button:hover {
    color: $cor-primaria;
  }

  &__avatar {
    background: $backgroud-primario-opaco;
    border: 1px solid $cor-primaria;
    border-radius: 50%;
    height: 3rem;
    width: 3rem;
  }
}
</style>
