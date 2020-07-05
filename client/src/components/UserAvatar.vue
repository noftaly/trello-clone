<template>
  <v-avatar :size="40" color="grey lighten-4" >
    <img :src="imageUrl" alt="avatar">
  </v-avatar>
</template>

<script>
export default {
  name: 'UserAvatar',
  props: {
    imageUrl: { type: String, required: true },
  },
};
</script>
