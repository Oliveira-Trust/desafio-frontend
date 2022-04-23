<template>
  <div
    class="modal-background"
    @click="handleBackgroundClick"
  >
    <div class="modal-dialog">
      <Card>
        <div v-if="title" class="modal-dialog-header">
          <h3>{{ title }}</h3>
          <hr class="solid">
        </div>
        <div class="modal-dialog-body">
          <slot name="body"></slot>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import Card from './Card.vue'

export default {
  name: 'Modal',
  components: {
    Card,
  },
  props: {
    title: {
      type: String,
      default: undefined
    }
  },
  methods: {
    close () {
      this.$emit('close');
    },
    handleBackgroundClick (e) {
      if (e.path[0].className === 'modal-background') {
        this.$emit('close');
      }
    }
  }
}
</script>

<style scoped>
.modal-background {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1;
  background-color: #000000DD;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-dialog {
 width: 45%;
}

.modal-dialog-header {
  padding: 30px 20px 10px 20px;
}

.modal-dialog-body {
  padding: 0 40px;
}
</style>
