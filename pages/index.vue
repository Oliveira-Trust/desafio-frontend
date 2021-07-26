<template>
  <div class="container mx-auto">
    <h1>Dashboard</h1>
    <section
      class="
        card-infos
        grid
        my-10
        justify-space-around
        items-center
        lg:grid-columns-3
      "
    >
      <VCard
        title="Funcionários"
        :value="funcionarios.length"
        :icon="['fas', 'users']"
      />
      <VCard
        title="Notificações"
        :value="notificacoes.length"
        :icon="['far', 'bell']"
      />
      <VCard
        title="Arquivos Enviados"
        :value="arquivosEnviados.length"
        :icon="['far', 'file']"
      />
    </section>
    <section>
      <div class="flex justify-space-between items-end">
        <h3>Relação de Funcionários</h3>
        <button class="btn pa-2">Adicionar Funcionário</button>
      </div>
      <VTable class="mt-5" :headers="headersTable" :rows="funcionarios">
        <template #contratado="{ value }">
          <span>{{ value }} meses</span>
        </template>
        <template #action>
          <i class="cursor-pointer">
            <font-awesome-icon class="sm-icon" :icon="['far', 'trash-alt']" />
          </i>
        </template>
      </VTable>
      <div class="skeleton skeleton-pagination w-60 mt-4 ml-auto lg:w-20" />
    </section>
  </div>
</template>

<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator'
import { IHeaderTable } from '~/types/IHeaderTable'

import { FuncionariosMixin } from '~/mixins/funcionarios'
import { NotificacoesMixin } from '~/mixins/notificacoes'

@Component
export default class IndexPage extends mixins(FuncionariosMixin, NotificacoesMixin) {
  arquivosEnviados = []
  headersTable: IHeaderTable[] = [
    {
      code: 'nome',
      text: 'Nome'
    },
    {
      code: 'sobrenome',
      text: 'Sobrenome'
    },
    {
      code: 'cargo',
      text: 'Cargo'
    },
    {
      code: 'setor',
      text: 'Setor'
    },
    {
      code: 'contratado',
      text: 'Tempo contratado',
      alignment: 'right'
    },
    {
      code: 'action',
      text: 'Ações',
      alignment: 'center',
      alignHeader: true
    }
  ]
}
</script>

<style lang="scss" scoped>
.card-infos {
  column-gap: 48px;
  row-gap: 24px;
}

.btn {
  background-color: $backgroud-primario-opaco;
  border: 1px solid $cor-primaria;
  border-radius: 4px;
  color: $cor-primaria;
}

.skeleton {
  background-color: rgba($cor-preta, 0.1);

  &-text {
    border-radius: 20px;
    height: 2rem;
  }

  &-card {
    border-radius: 20px;
    height: 10rem;
  }

  &-button {
    border-radius: 0.35rem;
    height: 2rem;
  }

  &-table {
    border-radius: 20px;
    height: 20rem;
  }

  &-pagination {
    border-radius: 20px;
    height: 2rem;
  }
}
</style>
