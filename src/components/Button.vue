<template>
  <button class="c-button" :class="{ outline: outline, primary: primary }">
    {{ label }}
  </button>
</template>

<script>
export default {
  name: "CButton",
  props: {
    label: {
      default: "",
      required: true,
    },
    outline: {
      default: false,
    },
    primary: {
      default: false,
    },
  },
};
</script>
