<template>
    <input
      class="text-input"
      type="text"
      :name="name"
      :placeholder="placeholder"
      v-model="inputVal"
      v-money="isCurrency && money"
    />
</template>

<script>
import { VMoney } from 'v-money'

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
      type: String,
      default: ''
    },
    isCurrency: {
      type: Boolean,
      default: false,
    }
  },
  data () {
    return {
      money: {
        decimal: ',',
        thousands: '.',
        prefix: 'R$ ',
        suffix: '',
        precision: 2,
        masked: false
      }
    }
  },
  directives: {money: VMoney},
  computed: {
    inputVal: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit('input', val);
      }
    }
  }
}
</script>

<style scoped>
.text-input {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #CCCCCC;
  border-radius: 4px;
  box-sizing: border-box;
}
</style>
