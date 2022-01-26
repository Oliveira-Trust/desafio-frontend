<template>
  <component :is="type" :class="['text-style', variation]"> <slot /> </component>
</template>

<script>
export default {
  name: "App-TextStyle",
  props: {
    type: {
      type: String,
      default: "span",
      validator: value => {
        return value.match(/(span|em|i|strong)/)
      },
    },
    variation: {
      type: String,
      default: "default",
      validator: value => {
        return value.match(/(default|disabled|strong|sucess|error)/)
      },
    },
  },
}
</script>

<style  scoped>
</style>