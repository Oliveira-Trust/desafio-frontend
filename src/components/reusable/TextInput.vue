<template>
    <input class="text-input" type="text" :name="name" :placeholder="placeholder" v-model="inputVal"/>
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
      type: String,
      default: ''
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
  }
}
</script>

<style scoped>
.text-input {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}
</style>
