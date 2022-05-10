<template>
  <div class="profile-avatar">
    <img :src="url" alt="User Profile Picture" class="profile-avatar-image">
  </div>
</template>

<script>
import defaultProfileAvatar from "../../assets/profile-avatar.png"

export default {
  name: 'ProfileAvatar',
  props: {
    url: {
      type: String,
      default: defaultProfileAvatar
    }
  }
}
</script>

<style scoped>
.profile-avatar-image {
  border: 1px solid #DDDDDD;
  width: 30px;
  border-radius: 50%;
}
</style>
