<template>
  <div class="main">
    <Header />
    <div class="add-user-container">
      <div class="add-user">
        <span>BTC Carteiras</span>
        <Button label="Adicionar Carteira" 
                v-bind:hasIcon="false" 
                buttonClass="btn-color"
                @click="showHandleUserModal"/>
      </div>
    </div>
    <Search @clicked="filterUsersData"/>
    <div class="table-main-container shadow-lg">
      <div class="table-title">
        <span>Carteira</span>
        <Button label="Exportar CSV" 
                v-bind:hasIcon="false" 
                buttonClass="btn-outline"/>
      </div>
      <Table v-bind:users="users" 
            @openEditUser="showHandleUserModal"
            @openRemoveUser="showRemoveUserModal" />

      <div class="divider" />
      <vue-ads-pagination
            :total-items="40"
            :max-visible-pages="10"
            :page="page"
            :loading="loading"
            @page-change="pageChange"
            @range-change="rangeChange">
            <template slot-scope="props">
                <div class="vue-ads-pr-2 vue-ads-leading-loose">
                    {{ props.total }} registro(s)
                </div>
            </template>
            <template
                slot="buttons"
                slot-scope="props"
            >
                <vue-ads-page-button
                    v-for="(button, key) in props.buttons"
                    :key="key"
                    v-bind="button"
                    @page-change="page = button.page"
                />
            </template>
        </vue-ads-pagination>
    </div>
    <Footer />

    <!-- Modal -->
    <HandleUserModal 
      v-show="isHandleUserModalVisible"
      @closeModal="closeModal"
      :user='user'
      :title="user ? 'Editar' : 'Adicionar'"/>

    <RemoveUserModal 
      v-show="isRemoveUserModalVisible"
      @closeModal="closeModal"
      :userId="userId"/>
  </div>
</template>

<script>
import Table from './Table.vue';
import Search from './Search.vue';
import Header from './Header.vue';
import Footer from './Footer.vue';
import Button from './Button.vue';
import HandleUserModal from './HandleUserModal.vue';
import RemoveUserModal from './RemoveUserModal.vue';

import { getUsers, filterUsers } from '../services/users';
import VueAdsPagination, { VueAdsPageButton } from 'vue-ads-pagination';

export default {
  name: 'Main',
  components: {
    Table,
    Search,
    Header,
    Footer,
    Button,
    HandleUserModal,
    RemoveUserModal,
    VueAdsPagination,
    VueAdsPageButton
  },
  data() {
      return {
          users: [],
          loading: false,
          page: 0,
          isHandleUserModalVisible: false,
          isRemoveUserModalVisible: false,
          userId: 0,
          user: {}
      }
  },
  created() {
      this.getUsersData(this.page);
  },
  methods: {
      async getUsersData(page) {
        try {
          const response = await getUsers(page)
          this.users = response.data;
        } catch (error) {
          console.log(error)
        }
        
      },
      async filterUsersData ({name, lastName, email}) {
        try {
          const response = await filterUsers(name, lastName, email)
          this.users = response.data;
        } catch (error) {
          console.log(error)
        }
      },
      pageChange (page) {
        this.page = page;
      },
      rangeChange () {
        this.getUsersData(this.page);
      },
      showHandleUserModal(value) {
        this.user = value;
        this.isHandleUserModalVisible = true;
      },
      showRemoveUserModal(value) {
        this.userId = value.id;
        this.isRemoveUserModalVisible = true;
      },
      closeModal() {
        this.getUsersData(this.page);
        this.isHandleUserModalVisible = false;
        this.isRemoveUserModalVisible = false;
      }
  },
}
</script>

<style lang="scss" scoped>
  .main {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;

    .add-user-container {
      display: flex;
      justify-content: center;
      width: 100%;

      .add-user{
        display: flex;
        justify-content: space-between;
        align-items: center;
        max-width: 1200px;
        padding: 46px 0 30px 0;
        width: 100%;

        span {
          font-size: 28px;
          font-weight: 700;
          color: #3a3a3a;
        }
      }
    }

    .table-main-container {
      box-sizing: border-box;
      padding: 20px;
      border-radius: 4px;
      background-color: #fff;
      max-width: 1200px;
      width: 100%;

      .table-title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px 0;

        span {
          font-weight: 600;
          color: #3a3a3a;
          font-size: 18px;
        }
      }

      .divider {
        padding-top: 30px;
        margin-bottom: 15px;
        border-bottom: 1px solid #f4f4f5;
      }
    }
  }

  .vue-ads-bg-teal-500 {
    background-color: #2d7bff;
    border-radius: 3px;
  }

  .vue-ads-text-xs {
    font-size: 14px;
  }
</style>
