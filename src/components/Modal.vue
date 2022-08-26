<template>
  <transition name="modal">
    <div class="c-modal-mask">
      <div class="c-modal-wrapper">
        <div class="c-modal-container">
          <div class="c-modal-header">
            <slot name="header"> default header </slot>
          </div>

          <div class="c-modal-body">
            <slot name="body"> default body </slot>
          </div>

          <div class="c-modal-footer">
            <slot name="footer">
              default footer
              <button class="c-modal-default-button" @click="$emit('close')">
                OK
              </button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "CModal",
  props: {
    show: {
      default: false,
    },
  },
};
</script>
