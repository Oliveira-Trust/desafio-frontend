<template>
  <transition name="fade" appear>
    <div class="container-modal-error">
      <div class="modal-error">
        <h3>Ops... Tente novamente em alguns instantes.</h3>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  name: "ModalError",
};
</script>
<style scoped>
.container-modal-error {
  background: rgba(0, 0, 0, 0.7);
  display: grid;
  height: 100vh;
  left: 0;
  max-width: 100%;
  place-items: center;
  position: fixed;
  top: 0;
  width: 100%;
  padding: 0 10px;
}
.modal-error {
  background: rgba(0, 0, 0, 0.7);
  border-radius: 8px;
  box-shadow: 0px 0px 3px 0px rgba(255, 255, 255, 0.3);
  padding: 20px;
  color: #fff;
  display: grid;
  height: 300px;
  max-width: 500px;
  place-items: center;
  width: 100%;
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
