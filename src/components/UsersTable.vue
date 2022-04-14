<template>
  <div class="users-table">
    <h2>Carteiras</h2>
    <table>
      <tr>
        <th>Nome</th>
        <th>Sobrenome</th>
        <th>Email</th>
        <th>Bitcoin</th>
        <th></th>
      </tr>
      <tr class="user-row" v-for="user in users" :key="user.id">
        <td>{{ user.nome }}</td>
        <td>{{ user.sobrenome }}</td>
        <td>{{ user.email }}</td>
        <td>{{ user.valor_carteira }}</td>
        <td class="users-table__actions__column">
          <div class="users-table__actions">
            <IconButton
              class="users-table__actions__action-button"
              name="pencil-alt"
              @onClick="handleEditClick(user)"
            />
            <IconButton
              class="users-table__actions__action-button"
              name="trash-alt"
              @onClick="handleDeleteClick(user)"
            />
          </div>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import IconButton from './IconButton.vue'

export default {
  name: 'UsersTable',
  components: {
    IconButton,
  },
  computed: {
    users () {
      return this.$store.getters.getUsers;
    }
  },
  methods: {
    handleEditClick (user) {
      console.log('edit', user);
    },
    handleDeleteClick (user) {
      console.log('delete', user);
    },
  }
}
</script>

<style scoped>
p {
  color: black;
}

h2 {
  margin-bottom: 20px;
}

table {
  width: 100%;
}

td {
  height: 50px;
  padding: 2px;
  text-align: left;
  vertical-align: bottom;
}

th {
  text-align: left;
  border-bottom: 1px solid #DDDDDD;
}

table tr:nth-child(odd) td {
  background-color: #F4F4F4;
}

table tr:nth-child(odd):hover td {
  background-color: #f5f9ff;
}

.user-row > td:first-child {
  border-left: 2px solid transparent;
}

.user-row:hover > td:first-child {
  border-left: 2px solid #2570e8;
}

.user-row:hover {
  background-color: #f5f9ff;
}

.users-table__actions {
  display: flex;
  justify-content: center;
  align-items: center;
}

.users-table__actions__column {
  display: flex;
  justify-content: center;
  align-items: center;
}

.users-table__actions__action-button {
  margin: 4px;
}

</style>
