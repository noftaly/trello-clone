<template>
  <v-app>
    <app-navbar :user="user" :logout="logout"></app-navbar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import AppNavbar from '@/components/AppNavbar';

export default {
  name: 'App',
  components: {
    AppNavbar,
  },
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
