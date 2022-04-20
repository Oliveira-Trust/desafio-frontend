<template>
  <Modal>
      <template v-slot:header>
        <span>{{ title }} Carteira</span>
      </template>

      <template v-slot:body>
        <div class="form">
            <Input :inputValue="name" 
                    inputType="text" 
                    inputLabel="Nome"
                    v-model="name"/>

            <Input :inputValue="lastName" 
                    inputType="text" 
                    inputLabel="Sobrenome"
                    v-model="lastName"/>

            <Input :inputValue="email" 
                    inputType="text" 
                    inputLabel="E-mail"
                    v-model="email"/>

            <div class="coins-info">
                <Input :inputValue="valueBrl" 
                        inputType="tel" 
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
              await editUser(this.user.id, {
                  "id": 1,
    "nome": this.name,
    "sobrenome": this.lastName,
    "email": this.email,
    "endereco": this.user.endereco,
    "data_nascimento": this.user.data_nascimento,
    "data_abertura": this.user.data_abertura,
    "valor_carteira": Number(convertBrlToBtc(this.valueBrl, this.valueBtc).toFixed(8)),
    "endereco_carteira": this.user.endereco_carteira
              });
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
          this.valueBrl = convertToBrl(this.user.valor_carteira, this.valueBtc);
      },
      clearFields() {
          this.name = '';
          this.lastName = '';
          this.email = '';
          this.valueBrl = 0;
      },
      closeModal() {
          this.clearFields();
          this.$emit('closeModal');
      },
      convertBrlToBtc,
      convertToBrl
  },
  watch: {
      user() {
          console.log('WORKS');
          this.setData()
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