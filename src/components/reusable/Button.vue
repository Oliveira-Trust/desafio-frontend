<template>
  <button
    class="button"
    :class="{
      'outlined' : outlined,
      'filled' : !outlined,
    }"
    @click="onClick"
  >
    <v-icon
      class="button-icon"
      :class="{
        'icon-with-label': !!label,
        'icon-outlined': outlined,
        'icon-filled': !outlined,
      }"
      v-if="icon"
      :name="icon"
    />
    {{ label }}
  </button>
</template>

<script>

export default {
  name: 'Button',
  props: {
    label: {
      type: String,
      default: undefined
    },
    outlined: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: String,
      default: undefined
    }
  },
  methods: {
    onClick () {
      this.$emit('onClick');
    }
  }
}
</script>

<style scoped>
.button {
  border-radius: 4px;
  padding: 10px 18px;
  text-align: center;
  text-decoration: none;
  display: flex;
  justify-content: center;
  font-size: 16px;
  width: 100%;
  cursor: pointer;
}

.filled {
  background-color: #2570e8;
  border: none;
  color: white;
}

.filled:hover {
  background-color: #6494e2;
}

.outlined {
  background-color: white;
  border: 2px solid #2570e8;
  color: #2570e8;
}

.outlined:hover {
  background-color: white;
  border: 2px solid #6494e2;
  color: #6494e2;
}

.icon-with-label {
  margin-right: 10px;
}

.icon-outlined {
  fill: #2570e8;
}

.outlined:hover > .icon-outlined {
  fill: #6494e2;
}

.icon-filled {
  fill: white;
}

</style>
