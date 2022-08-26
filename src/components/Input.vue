<template>
  <input
    type="text"
    :placeholder="placeholder"
    :class="classes"
    class="c-input"
    v-model="model"
  />
</template>

<script>
export default {
  name: "CInput",
  props: {
    placeholder: {
      default: "",
      required: true,
    },
    value: {
      default: "",
      required: true,
    },
    classes: {
      default: () => [],
    },
  },
  computed: {
    model: {
      get() {
        return this.value || "";
      },
      set(value) {
        this.$emit("change-value", value);
      },
    },
  },
};
</script>
