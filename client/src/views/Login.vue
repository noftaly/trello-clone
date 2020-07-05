<template>
  <v-container fluid>
    <v-layout column align-center>
      <v-form
        v-if="!loading"
        v-model="valid"
        @submit.prevent="login({ valid, user, router: $router })"
        @keydown.prevent.enter
      >
        <v-text-field
          v-model="user.username"
          :rules="notEmptyRules"
          label="Username"
          required
        ></v-text-field>
        <v-text-field
          v-model="user.password"
          :rules="notEmptyRules"
          label="Password"
          type="password"
          required
        ></v-text-field>
        <v-btn type="submit" :disabled="!valid">Login</v-btn>
      </v-form>
      <themed-progress v-else></themed-progress>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import ThemedProgress from '@/components/ThemedProgress';
import { notEmptyRules } from '@/validators';

export default {
  name: 'Login',
  components: {
    ThemedProgress,
  },
  data: () => ({
    valid: false,
    user: {
      username: '',
      password: '',
    },
    notEmptyRules,
  }),
  computed: {
    ...mapState('auth', { loading: 'isAuthenticatePending' }),
  },
  methods: {
    ...mapActions('auth', ['authenticate']),
    ...mapActions('localAuth', ['login']),
  },
};
</script>
