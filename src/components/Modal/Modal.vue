<style src="./Modal.css"></style>
<template>
  <div class="root" v-if="show">
    <div class="modal" v-click-outside="onClickOutside">
      <header class="modalHeader" v-if="title">
        <span class="titleModalHeader "> {{ title }}</span>
      </header>
      <button class="buttonModalClose pi pi-times" @click="close"></button>
      <slot name="body"></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: "Modal",
  props: {
    title: String,
    show: Boolean,
    closeOnClickOutside: Boolean,
  },
  methods: {
    close() {
      this.$emit("close");
    },
    onClickOutside() {
      if (this.closeOnClickOutside) {
        this.close();
      }
    },
  },
  directives: {
    "click-outside": {
      bind: function(el, binding, vnode) {
        el.clickOutsideEvent = function(event) {
          if (!(el == event.target || el.contains(event.target))) {
            vnode.context[binding.expression](event);
          }
        };
        document.body.addEventListener("click", el.clickOutsideEvent);
      },
      unbind: function(el) {
        document.body.removeEventListener("click", el.clickOutsideEvent);
      },
    },
  },
};
</script>
