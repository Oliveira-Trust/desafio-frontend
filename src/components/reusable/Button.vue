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
  padding: 10px 24px;
  text-align: center;
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  font-weight: bold;
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
  border: 1px solid #D5D5D5;
  color: #808080;
}

.small.outlined:hover {
  border: 1px solid #5393FF;
}

.filled {
  background-color: #2979FF;
  border: none;
  color: white;
}

.filled:hover {
  background-color: #5393FF;
}

.outlined {
  background-color: white;
  border: 1px solid #2979FF;
  color: #2979FF;
}

.outlined:hover {
  background-color: white;
  border: 1px solid #5393FF;
  color: #5393FF;
}

.icon-with-label {
  margin-right: 10px;
}

.icon-outlined {
  fill: #2979FF;
}

.outlined:hover > .icon-outlined {
  fill: #5393FF;
}

.icon-filled {
  fill: white;
}

</style>
