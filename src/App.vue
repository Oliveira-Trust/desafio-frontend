<template>
  <div id="app">
    <NavBar/>
    <div class="app-container">
      <div class="app-container-body">
        <div class="app-title">
          <h1>BTC Carteiras</h1>
          <div class="app-title-add-button">
            <Button label="Adicionar Carteira" @onClick="showUserModal"/>
          </div>
        </div>
        <div class="app-body">
          <Card class="app-body-filter">
            <FilterInput/>
          </Card>
          <Card class="app-body-table">
            <UsersTable @editUserClick="handleEditUser" @deleteUserClick="handleDeleteUser"/>
          </Card>
        </div>
        <div class="app-footer">
          <b>Fintools | Desafio Front-End</b>
        </div>
      </div>
    </div>
    <UserFormModal
      :user="userToEdit"
      :isOpen="isUserModalOpen"
      @close="closeUserModal"
    />
    <DeleteUserModal
      :user="userToDelete"
      :isOpen="isDeleteUserModalOpen"
      @close="closeDeleteUserModal"
    />
  </div>
</template>

<script>
import UsersTable from './components/feature/UsersTable.vue'
import Card from './components/reusable/Card.vue'
import Button from './components/reusable/Button.vue'
import NavBar from './components/feature/NavBar.vue'
import FilterInput from './components/feature/FilterInput.vue'
import UserFormModal from './components/feature/modals/UserFormModal.vue'
import DeleteUserModal from './components/feature/modals/DeleteUserModal.vue'
import './style.css'

export default {
  name: 'App',
  components: {
    UsersTable,
    Card,
    Button,
    NavBar,
    FilterInput,
    UserFormModal,
    DeleteUserModal,
  },
  data() {
    return {
      isUserModalOpen: false,
      userToEdit: {},
      isDeleteUserModalOpen: false,
      userToDelete: {},
    }
  },
  async created () {
    await this.$store.dispatch('pullUsers', { currentPage: 1 });
  },
  methods: {
    showUserModal () {
      this.isUserModalOpen = true;
    },
    closeUserModal () {
      this.isUserModalOpen = false;
      this.userToEdit = {};
    },
    handleEditUser (user) {
      this.userToEdit = user;
      this.showUserModal();
    },
    showDeleteUserModal () {
      this.isDeleteUserModalOpen = true;
    },
    closeDeleteUserModal () {
      this.isDeleteUserModalOpen = false;
      this.userToDelete = {};
    },
    handleDeleteUser (user) {
      this.userToDelete = user;
      this.showDeleteUserModal();
    },
  }
}
</script>

<style scoped>
h1 {
  padding: 30px 0;
  font-weight: 900;
}

.app-container {
  display: flex;
  justify-content: center;
}

.app-container-body {
  width: 80vw;
}

.app-title {
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
}

.app-title-add-button {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px 0;
}

.app-body {
  padding: 20px 0;
}

.app-body-filter {
  margin-bottom: 40px;
}

.app-footer {
  margin: 40px 0;
  display: flex;
  justify-content: center;
  font-size: 12px;
  color: #9F9F9F;
}

@media only screen and (max-width: 790px) {
  .app-container-body {
    width: 90vw;
  }
}
</style>
