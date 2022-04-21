<template>
  <div class="icon-button" @click="onClick">
    <v-icon class="icon" :name="name"/>
  </div>
</template>

<script>
import 'vue-awesome/icons/pencil-alt'
import 'vue-awesome/icons/trash-alt'
import 'vue-awesome/icons/search'
import 'vue-awesome/icons/chevron-right'
import 'vue-awesome/icons/chevron-left'
import 'vue-awesome/icons/regular/user-circle'

export default {
  name: 'IconButton',
  props: {
    name: {
      type: String,
      default: 'pencil-alt'
    }
  },
  methods: {
    onClick() {
      this.$emit('onClick');
    }
  }
}
</script>

<style scoped>
.icon-button {
  height: 24px;
  width: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3px 2px;
  border-radius: 50%;
  cursor: pointer;
}

.icon-button:hover {
  background-color: #DFDFDF;
}

.icon {
  fill: #656565;
}
</style>
