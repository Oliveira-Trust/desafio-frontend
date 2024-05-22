<script setup lang="ts">
import defaultProfileAvatar from '@/assets/profile-avatar.png'

interface Props {
  url?: string
}

withDefaults(defineProps<Props>(), {
  url: defaultProfileAvatar
})
</script>
<template>
  <div>
    <img :src="url" alt="User Profile Picture" class="w-7 rounded-full" />
  </div>
</template>
