<template>
  <div class="profile-avatar">
    <img :src="url" alt="User Profile Picture" class="profile-avatar__image">
  </div>
</template>

<script>
import defaultProfileAvatar from "../assets/profile-avatar.png"

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
.profile-avatar__image {
  border: 1px solid #DDDDDD;
  border-radius: 50%;
  width: 40px;
}

</style>
