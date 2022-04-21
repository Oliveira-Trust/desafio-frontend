<template>
  <button
    class="button"
    :class="{
      'outlined' : outlined,
      'filled' : !outlined,
      'small' : small
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
    small: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: undefined,
    },
    outlined: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: String,
      default: undefined,
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
  align-items: center;
  font-size: 16px;
  height: 40px;
  cursor: pointer;
}

.small {
  padding: 2px 4px;
  margin: 2px;
  height: 30px;
  min-width: 28px;
}

.small.outlined {
  border: 1px solid #b0b0b0;
  color: #808080;
}

.small.outlined:hover {
  border: 1px solid #6494e2;
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
