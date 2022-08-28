<template>
  <transition name="modal">
    <div class="c-modal-mask">
      <div class="c-modal-wrapper">
        <div class="c-modal-container">
          <div class="c-modal-header">
            <div class="c-modal-header__title">
              <slot name="header"> </slot>
            </div>
          </div>

          <div class="c-modal-body">
            <slot name="body"> </slot>
          </div>

          <div class="c-modal-footer">
            <slot name="footer">
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
