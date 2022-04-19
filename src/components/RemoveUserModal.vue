<template>
  <Modal>
      <template v-slot:header>
          <div class="header">
              <div class="icon">
                  <font-awesome-icon icon="fa-solid fa-trash" />
              </div>
          </div>
      </template>

      <template v-slot:body>
        <div class="body">
            <span>Excluir Carteira</span>
            <p>Tem certeza que deseja excluir essa Carteira? <br>
                Esta ação não poderá ser desfeita.
            </p>
        </div>
      </template>

      <template v-slot:footer>
        <div class="actions">
            <Button label="Excluir" 
                    v-bind:hasIcon="false" 
                    buttonClass="btn-red"/>
            <span class="close" @click="$emit('closeModal')">
                Cancelar
            </span>
        </div>
      </template>
    </Modal>
</template>

<script>
import Modal from './Modal.vue';
import Button from './Button.vue';
import { removeUser } from '../services/users';

export default {
  name: 'RemoveUserModal',
  props: {
      user: {}
  },
  components:{
      Modal,
      Button
  },
  methods: {
      async remove() {
          await removeUser(this.user.id);
          this.$emit('closeModal');
      }
  },
}
</script>

<style lang="scss" scoped>
    .header {
        display: flex;
        justify-content: center;
        width: 100%;
        color: #e32849;
        font-size: 40px;

        .icon {
            display: flex;
            align-items: center;
            justify-content: center;
            box-sizing: border-box;
            width: 80px;
            height: 80px;
            border-radius: 50%;
            border: 2px solid;
        }
    }
    .body {
        text-align: center;
        width: 550px;
        color: #3a3a3a;

        span {
            font-size: 22px;
            font-weight: 600;
        }
    }
    .actions {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        .close {
            font-size: 16px;
            font-weight: 600;
            color: #2d7bff;
            margin-top: 40px;
            cursor: pointer;
        }
    }
</style>