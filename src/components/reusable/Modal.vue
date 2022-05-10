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
        <div v-if="withExpiration" class="progress-bar">
          <div class="progress-bar-filled" :style="`width: ${expiration/1.2}%`"></div>
          <span class="tooltip-text">Essa transação expirará em {{expirationLimit - expiration}} segundos</span>
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
    },
    withExpiration: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      expiration: 0,
      expirationLimit: 120,
      expirationInterval: null
    }
  },
  created () {
    if (!this.withExpiration) return;
    this.expirationInterval = setInterval(
      () => this.expiration < this.expirationLimit
        ? this.expiration += 1
        : this.close()
    , 1000);
  },
  methods: {
    close () {
      clearInterval(this.expirationInterval);
      this.expiration = 0;
      this.$emit('close');
    },
    handleBackgroundClick (e) {
      if (e.path[0].className !== 'modal-background') return;
      this.close();
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

@media only screen and (max-width: 820px) {
  .modal-dialog {
    width: 60%;
  }
}

@media only screen and (max-width: 500px) {
  .modal-dialog {
    width: 80%;
  }
}

.progress-bar {
  position: relative;
  border-radius: 4px;
  height: 10px;
  width: 100%;
  background-color: #BEBEBE;
  transition: height 0.5s;
}

.progress-bar-filled {
  position: relative;
  border-radius: 4px;
  height: 10px;
  z-index: 1;
  background-color: #2979FF;
  transition: width 0.5s, height 0.5s;
}

.progress-bar:hover {
  height: 20px;
}

.progress-bar:hover .progress-bar-filled {
  height: 20px;
}

.progress-bar .tooltip-text {
  font-size: 14px;
  visibility: hidden;
  min-width: 80px;
  background-color: #424242;
  color: #FFF;
  text-align: center;
  padding: 7px 8px;
  border-radius: 6px;
  position: absolute;
  z-index: 1;
  top: 120%;
  left: 50%;
  margin-left: -120px;
  opacity: 0;
  transition: opacity 0.2s;
}

.progress-bar .tooltip-text::after {
  content: " ";
  position: absolute;
  bottom: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: transparent transparent #424242 transparent;
}

.progress-bar:hover .tooltip-text {
  visibility: visible;
  opacity: 1;
}
</style>
