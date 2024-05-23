<script setup lang="ts">
const model = defineModel()

defineProps<{
  placeholder?: string
  name?: string
  isCurrency?: boolean
  readOnly?: boolean
  error?: boolean
}>()
</script>

<template>
  <div
    :class="{
      'read-only': readOnly,
      error: error
    }"
    class="input-box"
  >
    <span v-if="isCurrency" class="prefix">R$</span>
    <input
      class="text-input"
      :type="isCurrency ? 'number' : 'text'"
      :name="name"
      :placeholder="placeholder"
      v-model="model"
      :readonly="readOnly"
    />
  </div>
</template>

<style scoped>
.input-box {
  @apply w-full flex items-center border-2 border-gray-300 rounded pt-[1px] pb-[1px] overflow-hidden mx-[0] my-2;
}

.input-box .prefix {
  @apply font-light text-sm text-zinc-700;
}

.prefix {
  @apply pl-2;
}

.text-input {
  @apply w-full text-sm bg-white border-[none] outline-[none] p-2;
}

.input-box:focus-within {
  @apply border-zinc-400;
}

.read-only {
  @apply bg-gray-200 cursor-not-allowed;
}

.error {
  @apply border-2 border-red-500;
}

.error:focus-within {
  @apply border-2 border-red-600;
}

input:read-only {
  @apply bg-gray-200 cursor-not-allowed;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  @apply m-0;
  -webkit-appearance: none;
}
</style>
