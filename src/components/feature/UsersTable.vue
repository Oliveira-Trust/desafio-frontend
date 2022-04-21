<template>
  <div class="users-table">
    <div class="users-table-title">
      <h2>Carteiras</h2>
      <Button outlined label="Exportar CSV"/>
    </div>
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
    <hr class="solid">
    <div class="users-table-footer">
      <p>{{ paginationData.totalItems }} registro(s)</p>
      <div class="users-table-footer-pagination">
        <IconButton name="chevron-left" @onClick="handlePreviousPageClick"/>
        <div v-for="i in [2, 1]" :key="'previous-' + i">
          <Button
            v-if="paginationData.currentPage > i"
            small
            outlined
            :label="(paginationData.currentPage - i).toString()"
            @onClick="handlePageClick(paginationData.currentPage - i)"
          />
        </div>
        <Button
          small
          :label="paginationData.currentPage.toString()"
          @onClick="handlePageClick(paginationData.currentPage)"
        />
        <div v-for="i in 2" :key="'next-' + i">
         <Button
            v-if="paginationData.currentPage + i <= paginationData.pages"
            small
            outlined
            :label="(paginationData.currentPage + i).toString()"
            @onClick="handlePageClick(paginationData.currentPage + i)"
          />
        </div>
        <IconButton name="chevron-right" @onClick="handleNextPageClick"/>
      </div>
    </div>
  </div>
</template>

<script>
import IconButton from '../reusable/IconButton.vue'
import Button from '../reusable/Button.vue'

export default {
  name: 'UsersTable',
  components: {
    IconButton,
    Button
  },
  computed: {
    users () {
      return this.$store.getters.getUsers;
    },
    paginationData () {
      return this.$store.getters.getPaginationData;
    },
  },
  methods: {
    handleEditClick (user) {
      console.log('edit', user);
    },
    handleDeleteClick (user) {
      console.log('delete', user);
    },
    async handlePageClick (page) {
      await this.$store.dispatch('pullUsers', { currentPage: page });
    },
    async handlePreviousPageClick () {
      if (this.paginationData.currentPage === 1) return;
      await this.$store.dispatch('pullUsers', {
        currentPage: this.paginationData.currentPage - 1,
      });
    },
    async handleNextPageClick () {
      if (this.paginationData.currentPage === this.paginationData.pages) return;
      await this.$store.dispatch('pullUsers',{
        currentPage: this.paginationData.currentPage + 1,
      });
    },
  }
}
</script>

<style scoped>
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
  background-color: #F5F9FF;
}

.users-table-title {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

hr.solid {
  margin: 30px 0;
  padding: 0;
  width: 100%;
  border-top: 1px solid #DDDDDD;
}

.users-table-footer {
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
}

.users-table-footer > p {
  color: #808080;
}

.users-table-footer-pagination {
  display: flex;
  justify-content: center;
  align-items: center;
}

.users-table-footer-pagination-first-last-page {
  display: flex;
  justify-content: center;
  align-items: flex-end;
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
