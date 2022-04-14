<template>
  <div class="users-table">
    <h2>Carteiras</h2>
    <table>
      <tr>
        <th>Nome</th>
        <th>Sobrenome</th>
        <th>Email</th>
        <th>Bitcoin</th>
      </tr>
      <tr v-for="user in users" :key="user.id">
        <td>{{ user.nome }}</td>
        <td>{{ user.sobrenome }}</td>
        <td>{{ user.email }}</td>
        <td>{{ user.valor_carteira }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: 'UsersTable',
  computed: {
    users () {
      return this.$store.getters.getUsers;
    }
  },
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

</style>
