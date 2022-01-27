<template>
  <div class="input-field">
    <input
      :type="type"
      :placeholder="placeholder"
      :class="['field', { error: error }]"
      :style="styleObject"
      :value="value"
      :name="name"
      :id="name"
      @input="updateValue($event.target.value)"
    />
    <label class="input-field-label" :for="name" v-text="label"></label>
    <p class="text-xs mt-1 text-red-500"></p>
  </div>
</template>

<script>
export default {
  name: "App-Input",
  props: {
    value: {
      default: null,
    },
    label: {
      type: String,
      default: "text",
    },
    error: {
      type: Boolean,
      default: false,
    },
    name: {
      type: String,
      default: "text",
    },
    type: {
      type: String,
      default: "text",
    },
    placeholder: {
      type: String,
      default: " ",
    },
    styleObject: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    updateValue(newValue) {
      this.$emit("input", newValue);
    },
  },
};
</script>
<style  scoped>
.input-field {
  position: relative;
  width: 100%;
  height: 2.7rem;
}

.field.error {
  border: 1px solid var(--color-error);
}
.field {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 1px solid #cbcfd6;
  border-radius: 0.3rem;
  font-size: inherit;
  font-weight: 100;
  outline: none;
  padding: 0.9rem 0.6rem 0;
  background: none;
}
.field:hover,
.field:focus {
  border: 0.12rem solid var(--color-primary);
}
.input-field-label {
  user-select: none;
  position: absolute;
  font-weight: 100;
  font-size: 0.8rem;
  top: 1rem;
  color: #7c7c7c;
  padding: 0 0.5rem;
  cursor: text;
  transition: top 200ms ease-in, left 200ms ease-in, font-size 200ms ease-in;
}

.field:focus ~ .input-field-label,
.field:not(:placeholder-shown).field:not(:focus) ~ .input-field-label {
  top: 0.4rem;
  font-size: 0.7rem;
  left: 0.2rem;
  color: var(--color-primary);
  border-color: var(--color-primary);
}
</style>
