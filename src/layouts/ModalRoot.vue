<template>
  <div :class="{ 'modal-mask': modal.component }">
    <transition name="modal">
      <component
        v-if="modal"
        :is="modal.component"
        :close="modal.close"
        :dismiss="modal.dismiss"
        v-bind="modal.props"
      />
    </transition>
  </div>
</template>

<script>
import ModalService from "@/services/ModalService";

export default {
  name: "App-ModalRoot",
  data() {
    return {
      modal: {},
    };
  },
  created() {
    ModalService.$on("open", ({ component, props, resolve, reject }) => {
      this.modal = {
        component,
        props,
        close: (value) => {
          this.modal = {};
          resolve(value);
        },
        dismiss: (reason) => {
          this.modal = {};
          reject(reason);
        },
      };
    });
  },
};
</script>

<style scoped>
</style>