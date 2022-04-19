<template>
  <Modal>
      <template v-slot:header>
        <span>Adicionar Carteira</span>
      </template>

      <template v-slot:body>
        <div class="form">
            <Input inputValue="" 
                inputType="text" 
                inputLabel="Nome"
                v-model="name"/>

            <Input inputValue="" 
                inputType="text" 
                inputLabel="Sobrenome"
                v-model="lastName"/>

            <Input inputValue="" 
                inputType="text" 
                inputLabel="E-mail"
                v-model="email"/>

            <Input inputValue="" 
                inputType="text" 
                inputLabel="Valor de Compra"
                v-model="value"/>
        </div>
      </template>

      <template v-slot:footer>
        <div class="actions">
            <span class="close" @click="closeModal">
                Cancelar
            </span>
            <Button label="Adicionar" 
                    v-bind:hasIcon="false" 
                    buttonClass="btn-color"
                    @click="addUser"/>
        </div>
      </template>
    </Modal>
</template>

<script>
import Modal from './Modal.vue';
import Input from './Input.vue';
import Button from './Button.vue';
import { addUser } from '../services/users';

export default {
  name: 'HandleUserModal',
  props: {
      user: {},
  },
  data() {
      return {
          name: '',
          lastName: '',
          email: '',
          value: 0
      }
  },
  components:{
      Modal, 
      Input,
      Button
  },
  methods: {
      async addUser() {
          try {
              await addUser({
                  nome: this.name,
                  sobrenome: this.lastName,
                  email: this.email,
                  valor_carteira: this.value
              });
              this.$emit('closeModal');
          } catch (error) {
              console.log(error);
          }

      },
      setData() {
          this.name = this.user.nome;
          this.lastName = this.user.sobrenome;
          this.email = this.user.email;
      },
      clearFields() {
          this.name = '';
          this.lastName = '';
          this.email = '';
      },
      closeModal() {
          this.$emit('closeModal');
          this.clearFields();
      }
  }
}
</script>

<style lang="scss" scoped>
    .form {
        display: flex;
        flex-direction: column;
        gap: 10px;
        width: 650px;
        margin-top: 30px;
    }

    .actions {
        display: flex;
        justify-content: flex-end;
        align-items: center;

        .close {
            font-size: 16px;
            font-weight: 600;
            color: #2d7bff;
            cursor: pointer;
            margin-right: 30px;
        }
    }
</style>