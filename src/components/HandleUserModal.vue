<template>
  <Modal>
      <template v-slot:header>
        <span>{{ title }} Carteira</span>
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

            <div class="coins-info">
                <Input inputValue="" 
                    inputType="text" 
                    inputLabel="Valor de Compra em R$"
                    v-model="valueBrl"/>
                <span>
                    BTC {{ convertBrlToBtc(valueBrl, valueBtc).toFixed(8) }}
                </span>
            </div>

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
                    @click="handleClick"/>
        </div>
      </template>
    </Modal>
</template>

<script>
import Modal from './Modal.vue';
import Input from './Input.vue';
import Button from './Button.vue';
import { addUser, editUser } from '../services/users';
import { getCoinValue } from '../services/coins';
import { convertBrlToBtc, convertToBrl } from '../utils/utils';

export default {
  name: 'HandleUserModal',
  props: {
      user: {},
      title: String
  },
  data() {
      return {
          name: '',
          lastName: '',
          email: '',
          valueBrl: 0,
          valueBtc: 0
      }
  },
  components: {
      Modal, 
      Input,
      Button
  },
  async created() {
      const value = await getCoinValue();
      this.valueBtc = value;
  },
  methods: {
      async addUser() {
          try {
              await addUser({
                  nome: this.name,
                  sobrenome: this.lastName,
                  email: this.email,
                  valor_carteira: this.valueBrl
              });
              this.$emit('closeModal');
          } catch (error) {
              console.log(error);
          }
      },
      async editUser() {
          try {
              await editUser({});
              this.$emit('closeModal');
          } catch (error) {
              console.log(error);
          }
      },
      handleClick() {
          this.user ? this.editUser() : this.addUser();
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
      },
      convertBrlToBtc,
      convertToBrl
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

        .coins-info {
            display: flex;

            span {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 50%;
                font-size: 18px;
                font-weight: 600;
                color: #3a3a3a;
            }
        }
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