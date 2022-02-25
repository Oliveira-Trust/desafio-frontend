<template>
  <transition name="fade" appear>
    <div class="container-modal-delete">
      <div class="modal-delete">
        <div class="container-icon">
          <font-awesome-icon icon="fa-trash" class="icon" />
        </div>
        <h4 class="title">Excluir Carteira</h4>
        <small> Tem certeza que deseja excluir essa Carteira? </small>
        <small> Esta ação não poderá ser desfeita. </small>
        <div class="actions">
          <button class="btn btn-confirm" @click="$emit('deleteActions', true)">
            Excluir
          </button>
          <button class="btn btn-cancel" @click="$emit('deleteActions', false)">
            Cancelar
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  name: "ModalDelete",
};
</script>
<style scoped>
.container-modal-delete {
  background: rgba(0, 0, 0, 0.7);
  display: grid;
  left: 0;
  max-width: 100%;
  min-height: 100vh;
  padding: 10px;
  place-items: center;
  position: fixed;
  top: 0;
  width: 100%;
}
.modal-delete {
  align-items: center;
  background: #fff;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  max-width: 500px;
  padding: 20px;
  width: 100%;
}
.container-icon {
  border-radius: 50%;
  border: 1px solid #c82333;
  display: grid;
  height: 60px;
  margin: 20px;
  place-items: center;
  width: 60px;
}
.icon {
  color: #c82333;
  font-size: 36px;
}
small {
  text-align: center;
}
.actions {
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 20px 0;
  max-width: 100%;
  width: 100%;
}
.btn {
  cursor: pointer;
  height: 40px;
  max-width: 270px;
  outline: none;
  transition: all 0.3s ease-out;
  user-select: none;
  width: 100%;
}
.btn-cancel {
  background: #fff;
  border: 1px solid #0069d9;
  color: #0069d9;
}
.btn-cancel:hover {
  background: #0069d9;
  color: #fff;
}
.btn-confirm {
  background: #c82333;
  border: 1px solid #c82333;
  color: #fff;
}
.btn-confirm:hover {
  background: #fff;
  color: #c82333;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
