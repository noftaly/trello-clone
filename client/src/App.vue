<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title>
        Noftaly's Trello
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <div v-if="!user">
        <v-btn :to="{ name: 'login' }">Login</v-btn>
        <v-btn :to="{ name: 'signup' }">Sign up</v-btn>
      </div>
      <div v-else>
        <v-btn @click="logout()">Logout</v-btn>
      </div>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'App',
  computed: {
    ...mapState('auth', { user: 'payload' }),
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
