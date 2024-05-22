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
  @apply px-[4px] py-[2px] m-[2px] h-[30px] min-w-[28px];
}

.small.outlined {
  @apply border-[1px] border-[solid] border-[#d5d5d5] text-[#808080] hover:border-[1px] hover:border-[solid] hover:border-[#5393ff];
}

.filled {
  @apply bg-[#2979ff] border-[none] text-[white] hover:bg-[#5393ff];
}

.outlined {
  @apply bg-[white] border-[1px] border-[solid] border-[#2979ff] text-[#2979ff] hover:bg-[white] hover:border-[1px] hover:border-[solid] hover:border-[#5393ff] hover:text-[#5393ff];
}

.icon-with-label {
  @apply mr-[10px];
}

.icon-outlined {
  @apply fill-[#2979ff];
}

.outlined:hover > .icon-outlined {
  @apply fill-[#5393ff];
}

.icon-filled {
  @apply fill-[white];
}

.danger {
  @apply bg-[#dc3545] hover:bg-[#b2102f];
}

.disabled {
  @apply bg-[#cfd8dc] cursor-not-allowed hover:bg-[#b0bec5];
}
</style>
