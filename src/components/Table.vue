<template>
  <div class="table-container">
    <table class="bg-white">
      <thead>
        <tr class="table-header">
          <th class="text-left px-8 py-4">Nome</th>
          <th class="text-left px-8 py-4">Sobrenome</th>
          <th class="text-left px-8 py-4">Email</th>
          <th class="text-left px-8 py-4">Bitcoin</th>
          <th class="text-left px-8 py-4"></th>
          <th class="text-left px-8 py-4"></th>
        </tr>
      </thead>
      <tbody>
      <template v-if="users.length > 0">
        <tr :key="index"
            v-for="(row, index) in users">
          <td class="px-8 py-4">{{ row.nome}}</td>
          <td class="px-8 py-4">{{ row.sobrenome}}</td>
          <td class="px-8 py-4">{{ row.email}}</td>
          <td class="px-8 py-4">{{ row.valor_carteira}}</td>
          <td class="px-8 py-4">
            <font-awesome-icon class="icon" icon="sign-out-alt" />
          </td>
          <td class="px-8 py-4">
            <font-awesome-icon class="icon" icon="sign-out-alt" />
          </td>
        </tr>
      </template>
      </tbody>
    </table>
  </div>
</template>

<script>

export default {
  name: 'Table',
  props: {
    users: Array
  },
  computed: {
    columns() {
      return [
          {
                value: 'nome',
                label: 'Nome'
            },
            {
                value: 'sobrenome',
                label: 'Sobrenome'
            },
            {
                value: 'email',
                label: 'E-mail'
            },
            {
                value: 'bitcoin',
                label: 'Bitcoin'
            },
            {
                value: 'actionBtn',
                label: ''
            }
      ]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .table-container {
    display: flex;
    justify-content: center;
    width: 100%;
    
    table {
      width: 100%;
      max-width: 1200px;

      .table-header {
        border-bottom: 2px solid #d8d8d8;
      }

      .icon {
        cursor: pointer;
      }

      tr:nth-child(even) {
        background: #f6f7fb;
      }

      tr:nth-child(odd) {
          background: #fff;
      }

      tr:last-child {
        border-bottom: 2px solid #d8d8d8;
      }

      tr:hover {
          background: #fafdff;
          border-left: 3px solid #68c0f3;
      }
    }
  }
</style>
