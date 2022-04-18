<template>
  <div class="modal-backdrop">
    <div class="modal">
      <header class="modal-header">
        <slot name="header">
          Default title!
        </slot>
      </header>

      <section class="modal-body">
        <slot name="body">
          Default body!
        </slot>
       </section>

      <footer class="modal-footer">
        <slot name="footer">
          Default footer!
            <button type="button"
                    class="btn-green"
                    @click="$emit('close')">
                Close Modal
            </button>
        </slot>
      </footer>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Modal'
  };
</script>

<style>
  .modal-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal {
    background: #FFFFFF;
    overflow-x: auto;
    padding: 50px;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
  }

  .modal-header {
    padding: 15px;
    display: flex;
  }

  .modal-header {
    position: relative;
    /* border-bottom: 1px solid #eeeeee; */
    color: #3a3a3a;
    font-size: 22px;
    font-weight: 600;
    justify-content: space-between;
  }

  .modal-footer {
    flex-direction: column;
    justify-content: flex-end;
  }

  .modal-body {
    position: relative;
    padding: 20px 10px;
  }

  .btn-close {
    position: absolute;
    top: 0;
    right: 0;
    border: none;
    font-size: 20px;
    padding: 10px;
    cursor: pointer;
    font-weight: bold;
    color: #4AAE9B;
    background: transparent;
  }

  .btn-green {
    color: white;
    background: #2d7bff;
    border: 1px solid #2d7bff;
    border-radius: 2px;
  }
</style>