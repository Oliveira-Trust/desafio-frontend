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
        <VButton @click="modalAdicao = true">
          Adicionar Funcionário
        </VButton>
        <VModal v-model="modalAdicao" class-width="w-40">
          <template #header>
            <div class="flex justify-space-between">
              <h1>Criação de funcionários</h1>
              <button
                class="cursor-pointer bg-transparent border-0"
                @click="modalAdicao = false"
              >
                <font-awesome-icon class="sm-icon" :icon="['fas', 'times']" />
              </button>
            </div>
          </template>
          <template #body>
            <VForm
              ref="formComponent"
              :campos="camposFormulario"
              @form-validado="modalAdicao = false"
            />
          </template>
          <template #footer>
            <VButton @click="formulario.validaFuncionario()">Salvar</VButton>
          </template>
        </VModal>
      </div>
      <VTable class="mt-5" :headers="headersTable" :items="funcionarios">
        <template #contratado="{ value }">
          <span>{{ value }} meses</span>
        </template>
        <template #action="{ itemKey }">
          <i class="cursor-pointer" @click="confirmaRemocao(itemKey)">
            <font-awesome-icon class="sm-icon" :icon="['far', 'trash-alt']" />
          </i>
        </template>
      </VTable>
      <VModal v-model="modalRemocao" class-width="w-40">
        <template #body>
          <p class="text-center">Deseja mesmo remover este usuário?</p>
          <div class="text-center mt-6">
            <VButton :text="true" @click="fechaRemocao">Cancelar Remoção</VButton>
            <VButton class="ml-3" @click="remocaoConfirmada">Confirmar Remoção</VButton>
          </div>
        </template>
      </VModal>
    </section>
  </div>
</template>

<script lang="ts">
import { Ref, Component, Vue, namespace } from 'nuxt-property-decorator'
import FormComponent from '~/components/VForm.vue'

import { IHeaderTable } from '~/types/IHeaderTable'
import { ICampoFormulario } from '~/types/ICampoFormulario'
import { IFuncionario } from '~/types/IFuncionario'

const funcionariosStore = namespace('funcionarios')
const notificacoesStore = namespace('notificacoes')

@Component
export default class IndexPage extends Vue {
  @Ref('formComponent') readonly formulario!: FormComponent

  @funcionariosStore.State
  readonly funcionarios!: IFuncionario[]

  @funcionariosStore.Mutation('DELETE_FUNCIONARIO')
  readonly removeFuncionario!: (id: number) => void

  @notificacoesStore.State
  readonly notificacoes!: Array<{ icon: string[]; text: string }>

  modalAdicao = false
  arquivosEnviados = []

  modalRemocao = false
  promiseRemocao: Promise<number> | undefined = undefined

  headersTable: IHeaderTable[] = [
    {
      code: 'nome',
      text: 'Nome',
    },
    {
      code: 'sobrenome',
      text: 'Sobrenome',
    },
    {
      code: 'cargo',
      text: 'Cargo',
    },
    {
      code: 'setor',
      text: 'Setor',
    },
    {
      code: 'contratado',
      text: 'Tempo contratado',
      alignment: 'right',
    },
    {
      code: 'action',
      text: 'Ações',
      alignment: 'center',
      alignHeader: true,
    },
  ]

  camposFormulario: ICampoFormulario[] = [
    {
      id: 'nome',
      label: 'Nome',
      field: 'input',
      type: 'text',
      classWidth: 'w-50',
    },
    {
      id: 'sobrenome',
      label: 'Sobrenome',
      field: 'input',
      type: 'text',
      classWidth: 'w-50',
    },
    {
      id: 'cargo',
      label: 'Cargo',
      field: 'select',
      options: [
        'Desenvolvedor Full-Stack Júnior',
        'Desenvolvedor Full-Stack Pleno',
        'Desenvolvedor Full-Stack Sênior',
        'Desenvolvedor Front-End Júnior',
        'Desenvolvedor Front-End Pleno',
        'Desenvolvedor Front-End Sênior',
        'Desenvolvedor Back-End Júnior',
        'Desenvolvedor Back-End Pleno',
        'Desenvolvedor Back-End Sênior',
        'Lead Tech',
      ],
      classWidth: 'w-full',
    },
    {
      id: 'setor',
      label: 'Setor',
      field: 'select',
      options: ['Pagamento', 'Produto', 'API', 'Componentes'],
      classWidth: 'w-40',
    },
    {
      id: 'contratado',
      label: 'Tempo de contratado (em meses)',
      field: 'input',
      type: 'number',
      classWidth: 'w-60',
    },
  ]

  confirmaRemocao(idFuncionario: number) {
    this.modalRemocao = true
    this.promiseRemocao = new Promise((resolve) => resolve(idFuncionario))
  }

  remocaoConfirmada() {
    this.promiseRemocao?.then((idFuncionario: number) => {
      this.removeFuncionario(idFuncionario)
      this.fechaRemocao()
    })
  }

  fechaRemocao() {
    this.modalRemocao = false
    this.promiseRemocao = undefined
  }
}
</script>

<style lang="scss" scoped>
.card-infos {
  column-gap: 48px;
  row-gap: 24px;
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
