<template>
  <form class="form flex flex-wrap">
    <div
      v-for="campo in campos"
      :key="campo.id"
      class="input__group flex flex-column pa-4"
      :class="campo.classWidth"
    >
      <label :for="campo.id" class="form__label mb-1">
        {{ campo.label }}
      </label>
      <input
        v-if="campo.field === 'input'"
        :id="campo.id"
        v-model="novoFuncionario[campo.id]"
        :type="campo.type"
        class="form__input pa-2"
      />
      <select
        v-if="campo.field === 'select'"
        :id="campo.id"
        v-model="novoFuncionario[campo.id]"
        class="form__select pa-2"
      >
        <option v-for="option in campo.options" :key="option">
          {{ option }}
        </option>
      </select>
      <span v-if="hasError(campo.id)" class="form__message mt-1">
        {{ getErrorMessage(campo.id) }}
      </span>
    </div>
  </form>
</template>

<script lang="ts">
import { Prop, Component, Vue, namespace } from 'nuxt-property-decorator'

import { IFuncionario } from '~/types/IFuncionario'
import { ICampoFormulario } from '~/types/ICampoFormulario'

const funcionariosStore = namespace('funcionarios')

@Component
export default class FormComponent extends Vue {
  @funcionariosStore.Mutation('ADICIONA_FUNCIONARIO')
  adicionaFuncionario!: (funcionario: IFuncionario) => void

  @Prop({ type: Array, required: true }) readonly campos!: ICampoFormulario[]

  erros: Array<{ code: string; message: string }> = []

  novoFuncionario: IFuncionario = {
    nome: '',
    sobrenome: '',
    cargo: '',
    setor: '',
    contratado: 0,
  }

  validaFuncionario() {
    this.erros = []

    if (!this.novoFuncionario.nome)
      this.erros.push({
        code: 'nome',
        message: 'O nome do funcionário não pode ser vazio',
      })
    if (!this.novoFuncionario.sobrenome)
      this.erros.push({
        code: 'sobrenome',
        message: 'O sobrenome do funcionário não pode ser vazio',
      })
    if (!this.novoFuncionario.cargo)
      this.erros.push({
        code: 'cargo',
        message: 'O cargo do funcionário não pode ser vazio',
      })
    if (!this.novoFuncionario.setor)
      this.erros.push({
        code: 'setor',
        message: 'O setor do funcionário não pode ser vazio',
      })
    if (this.novoFuncionario.contratado <= 0)
      this.erros.push({
        code: 'contratado',
        message:
          'O tempo de contratado do funcionário não pode ser menor que zero',
      })

    if (this.erros.length === 0) {
      this.adicionaFuncionario(this.novoFuncionario)
      this.$emit('form-validado')

      this.novoFuncionario = {
        nome: '',
        sobrenome: '',
        cargo: '',
        setor: '',
        contratado: 0,
      }
    }
  }

  hasError(code: string) {
    return this.erros.find((erro) => erro.code === code)
  }

  getErrorMessage(code: string) {
    return this.erros.find((erro) => erro.code === code)?.message
  }
}
</script>

<style lang="scss" scoped>
.form {
  &__input,
  &__select {
    border: 1px solid $cor-preta;
    border-radius: 8px;
  }

  &__message {
    color: $cor-primaria;
    font-size: 0.75rem;
  }
}
</style>
