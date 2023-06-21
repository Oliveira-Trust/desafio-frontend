<template>
  <div class="modal-mask">
    <div class="modal-container container">
      <header class="d-flex flex-row align-items-center my-3">
        <slot name="title"></slot>
        <button type="button" @click="HIDE_MODAL" class="btn btn-light btn-close ml-auto"><i class="bi bi-x-lg"></i></button>
      </header>
      <section class="my-3">
        <slot name="body"></slot>
      </section>
      <footer class="my-3">
        <slot name="footer"></slot>
      </footer>
    </div>
  </div>
</template>

<script>
  import { mapMutations } from 'vuex';

  export default {
    methods: {
      ...mapMutations('modal', ['HIDE_MODAL'])
    }
  }
</script>

<style scoped>
  .modal-mask {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;
  }
  .modal-container {
    position: fixed;
    border-radius: 4px;
    left: 0;
    right: 0;
    background-color: #fff;
    min-width: 400px;
    margin: 0 auto;
    width: 100%;
    z-index: 99999;
  }
  @media (min-width: 480px) {
    .modal-container {
      width: 400px;
    }
  }
</style>