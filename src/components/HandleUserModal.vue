<template>
  <Modal>
      <template v-slot:header>
        <span>Adicionar Carteira</span>
      </template>

      <template v-slot:body>
        <div class="form">
            <Input inputValue="" 
                inputType="text" 
                inputLabel="Nome"/>

            <Input inputValue="" 
                inputType="text" 
                inputLabel="Sobrenome"/>

            <Input inputValue="" 
                inputType="text" 
                inputLabel="E-mail"/>

            <Input inputValue="" 
                inputType="text" 
                inputLabel="Valor de Compra"/>
        </div>
      </template>

      <template v-slot:footer>
        <div class="actions">
            <span class="close" @click="$emit('closeModal')">
                Cancelar
            </span>
            <Button label="Adicionar" 
                    v-bind:hasIcon="false" 
                    buttonClass="btn-color"/>
        </div>
      </template>
    </Modal>
</template>

<script>
import Modal from './Modal.vue';
import Input from './Input.vue';
import Button from './Button.vue';

export default {
  name: 'HandleUserModal',
  props: {
      user: {}
  },
  components:{
      Modal, 
      Input,
      Button
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