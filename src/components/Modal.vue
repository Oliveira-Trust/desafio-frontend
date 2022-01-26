<template>
  <div
    class="modal-wrapper"
    tabindex="-1"
    role="dialog"
    aria-labelledby="Modal"
    aria-hidden="true"
  >
    <div class="modal-container">
      <div class="modal-header">
        <slot name="modalHeader"></slot>
      </div>
      <div class="modal-body">
        <slot name="modalBody"></slot>
      </div>
      <div class="modal-footer">
        <slot name="modalFooter"></slot>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "App-Modal",
};
</script>