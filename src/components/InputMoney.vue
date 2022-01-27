<template>
  <div class="input-field">
    <input
      :placeholder="placeholder"
      class="field"
      :name="name"
      :id="name"
      v-bind:v-model="value"
      :value="value"
      v-money="money"
      @input="updateValue($event.target.value)"
    />
    <label class="input-field-label" :for="name" v-text="label"></label>
    <p class="text-xs mt-1 text-red-500"></p>
  </div>
</template>

<script>
export default {
  name: "App-InputMoney",
  data() {
    return {
      money: {
        decimal: ",",
        thousands: ".",
        prefix: "R$ ",
        precision: 2,
        masked: false,
      },
    };
  },
  props: {
    value: {
      type: String,
      default: "",
    },
    label: {
      type: String,
      default: "text",
    },
    name: {
      type: String,
      default: "text",
    },
    placeholder: {
      type: String,
      default: " ",
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
