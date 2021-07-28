import { Module, VuexModule, VuexMutation } from 'nuxt-property-decorator'

@Module({
  name: 'arquivos',
  namespaced: true,
  stateFactory: true,
})
export default class ArquivosModule extends VuexModule {
  arquivos: File[] = []

  @VuexMutation
  ADICIONA_ARQUIVO(file: File) {
    this.arquivos.push(file)
  }

  @VuexMutation
  ADICIONA_ARQUIVOS(files: File[]) {
    this.arquivos = [...this.arquivos, ...files]
  }
}
