<template>
  <v-container fluid>
    <v-layout column align-center>
      <v-form
        v-if="!loading"
        v-model="valid"
        @submit.prevent="login()"
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
      <v-progress-circular
        v-else
        :size="70"
        :width="7"
        color="primary"
        indeterminate
      ></v-progress-circular>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'Login',
  data: () => ({
    valid: false,
    user: {
      username: '',
      password: '',
    },
    notEmptyRules: [(value) => !!value || 'Cannot be empty.'],
  }),
  computed: {
    ...mapState('auth', { loading: 'isAuthenticatePending' }),
  },
  methods: {
    ...mapActions('auth', ['authenticate']),
    login() {
      if (this.valid) {
        this.authenticate({ strategy: 'local', ...this.user })
          .then(() => this.$router.push('/boards'))
          .catch((e) => console.error('Authentication error', e));
      }
    },
  },
};
</script>
