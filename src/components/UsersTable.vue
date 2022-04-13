<template>
  <div class="users-table">
    <ul>
      <li v-for="user in users" :key="user.id"><p>{{ user.nome }}</p></li>
    </ul>
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
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
</style>
