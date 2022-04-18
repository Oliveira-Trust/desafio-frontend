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
            v-for="(user, index) in users">
          <td class="px-8 py-4">{{ user.nome}}</td>
          <td class="px-8 py-4">{{ user.sobrenome}}</td>
          <td class="px-8 py-4">{{ user.email}}</td>
          <td class="px-8 py-4">{{ user.valor_carteira}}</td>
          <td class="px-8 py-4">
            <div class="actions" @click="$emit('openEditUser', user)">
              <font-awesome-icon icon="fa-solid fa-pen" />
            </div>
          </td>
          <td class="px-8 py-4">
            <div class="actions" @click="$emit('openRemoveUser', user)">
              <font-awesome-icon icon="fa-solid fa-trash" />
            </div>
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
  }
}
</script>

<style lang="scss" scoped>
  .table-container {
    display: flex;
    justify-content: center;
    width: 100%;
    
    table {
      width: 100%;
      max-width: 1200px;
      color: #3a3a3a;

      .table-header {
        border-bottom: 2px solid #d8d8d8;
      }

      tr:nth-child(even) {
        background: #f5f6f8;
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

      .actions {
        cursor: pointer;
      }
    }
  }
</style>
