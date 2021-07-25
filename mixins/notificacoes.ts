import { Vue, Component } from 'nuxt-property-decorator'

@Component
export class NotificacoesMixin extends Vue {
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
