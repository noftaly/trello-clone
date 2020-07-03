<template>
  <v-app>
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
          <v-avatar :size="40" color="grey lighten-4" >
            <img :src="user.imageUrl" alt="avatar">
          </v-avatar>
        </v-layout>
        <v-btn text @click="logout()">Logout</v-btn>
      </v-toolbar-items>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'App',
  computed: {
    ...mapGetters('auth', ['user']),
  },
  methods: {
    ...mapActions('auth', { authLogout: 'logout' }),
    logout() {
      this.authLogout()
        .then(() => this.$router.push('/login'))
        .catch((e) => console.error('Authentication error (logout):', e));
    },
  },
};
</script>
