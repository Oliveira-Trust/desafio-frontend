import { Module, VuexModule } from 'nuxt-property-decorator'

@Module({
  name: 'notificacoes',
  namespaced: true,
  stateFactory: true,
})
export default class NotificacoesModule extends VuexModule {
  notificacoes = [
    {
      icon: ['far', 'envelope'],
      text: 'O Usuário 2 te enviou uma mensagem',
    },
    {
      icon: ['fas', 'exclamation-circle'],
      text: 'Seus dados cadastrados precisam de atenção',
    },
    {
      icon: ['far', 'clock'],
      text: 'O tempo para participação está acabando!',
    },
  ]
}
