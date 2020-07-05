<template>
  <v-app-bar app>
    <v-btn :to="{ name: 'home' }">
      Noftaly's Trello
    </v-btn>

    <v-spacer></v-spacer>

    <div v-if="!user">
      <v-btn :to="{ name: 'login' }">Login</v-btn>
      <v-btn :to="{ name: 'signup' }">Sign up</v-btn>
    </div>
    <v-toolbar-items v-else>
      <v-layout justify-content align-center class="mr-4">
        <h3 class="mr-2">{{user.displayName}}</h3>
        <user-avatar :imageUrl="user.imageUrl"></user-avatar>
      </v-layout>
      <v-btn text @click="logout()">Logout</v-btn>
    </v-toolbar-items>
  </v-app-bar>
</template>

<script>
import UserAvatar from '@/components/UserAvatar';

export default {
  components: {
    UserAvatar,
  },
  props: {
    user: { type: String, required: true },
    logout: { type: Function, required: true },
  },
};
</script>
