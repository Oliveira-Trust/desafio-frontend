<script setup lang="ts">
defineProps<{
  small?: boolean
  label?: string
  outlined?: boolean
  icon?: string
  danger?: boolean
  disabled?: boolean
}>()

const emit = defineEmits(['onClick'])

const onClick = () => {
  emit('onClick')
}
</script>

<template>
  <button
    class="btn"
    :class="{
      outlined: outlined,
      filled: !outlined,
      small: small,
      danger: danger,
      disabled: disabled
    }"
    :disabled="disabled"
    @click="onClick"
  >
    <font-awesome-icon
      class="button-icon"
      :class="{
        'icon-with-label': !!label,
        'icon-outlined': outlined,
        'icon-filled': !outlined
      }"
      v-if="icon"
      :icon="['fas', icon]"
    />
    {{ label }}
  </button>
</template>

<style scoped>
.btn {
  @apply rounded px-6 py-2.5 text-center no-underline flex justify-center items-center text-sm font-bold h-10 cursor-pointer;
}
.small {
  @apply px-1 py-0.5 m-0.5 h-8 min-w-7;
}

.small.outlined {
  @apply border border-slate-400 text-gray-700 hover:border-sky-600;
}

.filled {
  @apply bg-sky-700 border-[none] text-white hover:bg-sky-600;
}

.outlined {
  @apply bg-[white] border border-sky-700 text-sky-700 hover:border-sky-600 hover:text-sky-600;
}

.icon-with-label {
  @apply mr-2.5;
}

.icon-outlined {
  @apply fill-sky-700;
}

.outlined:hover > .icon-outlined {
  @apply fill-sky-600;
}

.icon-filled {
  @apply fill-[white];
}

.danger {
  @apply bg-red-500 hover:bg-red-600;
}

.disabled {
  @apply bg-sky-200 cursor-not-allowed hover:bg-sky-300;
}
</style>
