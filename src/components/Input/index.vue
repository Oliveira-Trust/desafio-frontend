<template>
  <div class="container-input">
    <input
      :id="id"
      :class="[handleTypeValue && 'active', localError && 'error']"
      class="input"
      :type="type"
      v-model="localValue"
      :autocomplete="autoComplete ? 'on' : 'off'"
    />
    <label :class="localError && 'error'" :for="id">{{ label }}</label>
  </div>
</template>
<script>
export default {
  name: "Input",
  props: {
    id: { type: String, default: "ipt" },
    label: { type: String, default: "Input Placeholder" },
    value: { type: [String, Number], default: "" },
    type: { type: String, default: "text" },
    autoComplete: { type: Boolean, default: true },
    error: { type: Boolean, default: false },
  },
  data: () => ({
    localValue: "",
    localError: false,
  }),
  computed: {
    handleTypeValue() {
      if (isNaN(this.localValue)) {
        return String(this.localValue.length);
      } else {
        if (Number(this.localValue) > 0) return true;
        return false;
      }
    },
  },
  watch: {
    localValue(val) {
      if (val && val.length) this.localError = false;
      this.$emit("update:input", { key: this.id, val });
    },
    value(val) {
      this.localValue = val || "";
    },
    error(val) {
      this.localError = val;
    },
  },
  created() {
    this.localValue = this.value;
    this.localError = this.error;
  },
};
</script>
<style scoped>
.container-input {
  background: transparent;
  position: relative;
  user-select: none;
  flex: 1 1 200px;
}
.input {
  border-radius: 8px;
  border: 1px solid transparent;
  max-width: 100%;
  outline: none;
  padding: 17px 10px 7px;
  transition: all 0.5s ease;
  width: 100%;
  border: 1px solid #eee;
}
label {
  font-size: 1rem;
  left: 10px;
  position: absolute;
  top: 30%;
  transition: all 0.5s ease;
}
input:focus,
.active {
  border: 1px solid #0069d9;
}
input:focus ~ label,
.active ~ label {
  color: #0069d9;
  font-size: 0.7rem;
  top: 2px;
}
input[type="search"]::-webkit-search-decoration,
input[type="search"]::-webkit-search-cancel-button,
input[type="search"]::-webkit-search-results-button,
input[type="search"]::-webkit-search-results-decoration {
  -webkit-appearance: none;
}
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
input[type="number"] {
  -moz-appearance: textfield;
  appearance: textfield;
}
.error {
  border-color: #c82333;
  color: #c82333;
}
</style>
