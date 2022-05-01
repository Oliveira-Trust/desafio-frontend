<template>
  <div class="input-box">
    <span v-if="isCurrency" class="prefix">R$</span>
    <input
      class="text-input"
      :type="isCurrency ? 'number' : 'text'"
      :name="name"
      :placeholder="placeholder"
      v-model="inputVal"
    />
  </div>
</template>

<script>
export default {
name: 'TextInput',
  props: {
    placeholder: {
      type: String,
      default: 'Name'
    },
    name: {
      type: String,
      default: 'nome'
    },
    value: {
      type: [Number, String],
      default: ''
    },
    isCurrency: {
      type: Boolean,
      default: false,
    }
  },
  computed: {
    inputVal: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit('input', val);
      }
    }
  },
}
</script>

<style scoped>
.input-box {
  width: 100%;
  display: flex;
  align-items: center;
  border: 1px solid #CCCCCC;
  border-radius: 4px;
  padding-top: 2px;
  padding-bottom: 2px;
  overflow: hidden;
  margin: 8px 0;
}

.input-box .prefix {
  font-weight: 300;
  font-size: 14px;
  color: #777;
}

.prefix {
  padding-left: 8px;
}

.text-input {
  width: 100%;
  font-size: 14px;
  background: #FFF;
  border: none;
  outline: none;
  padding: 8px;
}

.input-box:focus-within {
  border-color: #777;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type=number] {
  -moz-appearance:textfield;
}
</style>
