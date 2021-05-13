<template>
  <v-container fluid class="ma-0 pa-0">
    <v-row>
      <v-col>
        <Funcionarios />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <UploadFiles />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    wasloaded: false,
    items: [{ id: 1, src: '/equipe.png', msg: '' }],
  }),
}
</script>

<style scoped>
/* slide */
.page-leave-active {
  -webkit-animation: rotateSlideOut 1s both ease;
  animation: rotateSlideOut 1s both ease;
}
.page-enter-active {
  -webkit-animation: rotateSlideIn 1s both ease;
  animation: rotateSlideIn 1s both ease;
}

@-webkit-keyframes rotateSlideOut {
  0% {
  }
  25% {
    opacity: 0.5;
    -webkit-transform: translateZ(-500px);
  }
  75% {
    opacity: 0.5;
    -webkit-transform: translateZ(-500px) translateX(-200%);
  }
  100% {
    opacity: 0.5;
    -webkit-transform: translateZ(-500px) translateX(-200%);
  }
}
@keyframes rotateSlideOut {
  0% {
  }
  25% {
    opacity: 0.5;
    -webkit-transform: translateZ(-500px);
    transform: translateZ(-500px);
  }
  75% {
    opacity: 0.5;
    -webkit-transform: translateZ(-500px) translateX(-200%);
    transform: translateZ(-500px) translateX(-200%);
  }
  100% {
    opacity: 0.5;
    -webkit-transform: translateZ(-500px) translateX(-200%);
    transform: translateZ(-500px) translateX(-200%);
  }
}

@-webkit-keyframes rotateSlideIn {
  0%,
  25% {
    opacity: 0.5;
    -webkit-transform: translateZ(-500px) translateX(200%);
  }
  75% {
    opacity: 0.5;
    -webkit-transform: translateZ(-500px);
  }
  100% {
    opacity: 1;
    -webkit-transform: translateZ(0) translateX(0);
  }
}
@keyframes rotateSlideIn {
  0%,
  25% {
    opacity: 0.5;
    -webkit-transform: translateZ(-500px) translateX(200%);
    transform: translateZ(-500px) translateX(200%);
  }
  75% {
    opacity: 0.5;
    -webkit-transform: translateZ(-500px);
    transform: translateZ(-500px);
  }
  100% {
    opacity: 1;
    -webkit-transform: translateZ(0) translateX(0);
    transform: translateZ(0) translateX(0);
  }
}
.no-underscore {
  text-decoration: none;
}

.text-pos {
  z-index: 1000;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
#lts-title {
  letter-spacing: 2px !important;
}

.lts-2 {
  letter-spacing: 3px !important;
}

.v-card {
  transition: opacity 0.4s ease-in-out;
}

.v-card:not(.on-hover) {
  opacity: 0.6;
}
#font-1 {
  letter-spacing: 3px;
  font-size: 2rem;
}
#font-2 {
  letter-spacing: 3px;
  font-size: 1.5rem;
}
</style>
